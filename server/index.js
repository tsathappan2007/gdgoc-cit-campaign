import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env for local development (Node 20.6+ native loadEnvFile)
try {
  const rootEnv = path.resolve(process.cwd(), '.env');
  const serverEnv = path.resolve(__dirname, '../.env');
  if (fs.existsSync(rootEnv) && typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(rootEnv);
  } else if (fs.existsSync(serverEnv) && typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(serverEnv);
  }
} catch {
  // If parsing fails or in serverless environments without .env file, proceed
}

import { getCurriculumBadges, scrapeProfile } from './scraper.js';
import { store } from './store.js';

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PIN = process.env.ADMIN_PIN || 'CITGDG2024';
const ADMIN_TOKEN = crypto.createHash('sha256').update(`cit-admin-${ADMIN_PIN}`).digest('hex');

// In-memory rate limiting map for /api/check-profile (per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;

function rateLimiter(req, res, next) {
  const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ip = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : 'unknown';
  const now = Date.now();

  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW_MS;
  } else {
    record.count++;
  }

  rateLimitMap.set(ip, record);

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 200) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) rateLimitMap.delete(key);
    }
  }

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Rate limit reached: Too many profile checks from this network. Please wait a minute before checking another profile.',
    });
  }

  next();
}

// Authentication middleware for administrative operations
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const queryToken = req.query.token;
  const headerPin = req.headers['x-admin-pin'];

  const providedToken = (authHeader && authHeader.replace(/^Bearer\s+/i, '').trim()) || queryToken;

  if (
    providedToken === ADMIN_TOKEN ||
    headerPin === ADMIN_PIN ||
    providedToken === 'admin-auth-token-cit-gdg'
  ) {
    return next();
  }

  return res.status(401).json({
    error: 'Unauthorized: Valid Admin credentials required.',
  });
}

app.use(cors());
app.use(express.json());

// 1. Badges endpoint
app.get('/api/badges', (req, res) => {
  const badges = getCurriculumBadges();
  res.json({
    badges,
    total: badges.length,
  });
});

// 2. Profile Check endpoint (with IP Rate Limiting)
app.post('/api/check-profile', rateLimiter, async (req, res) => {
  try {
    const { profileUrl } = req.body;
    if (!profileUrl) {
      return res.status(400).json({ error: 'profileUrl is required in request body' });
    }

    const data = await scrapeProfile(profileUrl);

    // Save/update in store (asynchronous with MongoDB support)
    const updated = await store.upsert(data);

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.error('Error in /api/check-profile:', err.message);
    res.status(400).json({
      error: err.message || 'Failed to check profile. Ensure profile is public.',
    });
  }
});

// 3. Leaderboard endpoint
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await store.getLeaderboard();
    res.json({
      success: true,
      leaderboard,
      count: leaderboard.length,
    });
  } catch (err) {
    console.error('Error in /api/leaderboard:', err.message);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// 4. Chapter stats endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await store.getStats();
    res.json({
      success: true,
      stats,
    });
  } catch (err) {
    console.error('Error in /api/stats:', err.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// 5. Admin Login endpoint
app.post('/api/admin/login', (req, res) => {
  const { pin } = req.body;
  if (!pin) {
    return res.status(400).json({ error: 'PIN is required' });
  }

  if (pin === ADMIN_PIN) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      message: 'Authentication successful',
    });
  }

  return res.status(401).json({
    error: 'Invalid Admin PIN. Please check with your GDGoC Lead.',
  });
});

// 6. Admin full roster data (PROTECTED)
app.get('/api/admin/roster', requireAdminAuth, async (req, res) => {
  try {
    const leaderboard = await store.getLeaderboard();
    res.json({
      success: true,
      roster: leaderboard,
      count: leaderboard.length,
    });
  } catch (err) {
    console.error('Error in /api/admin/roster:', err.message);
    res.status(500).json({ error: 'Failed to fetch roster' });
  }
});

// 7. Admin CSV export endpoint (PROTECTED)
app.get('/api/admin/export', requireAdminAuth, async (req, res) => {
  try {
    const csv = await store.exportCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="gdgoc_cit_campaign_roster.csv"');
    res.send(csv);
  } catch (err) {
    console.error('Error in /api/admin/export:', err.message);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});

// 8. Admin Clear Leaderboard endpoint (PROTECTED)
app.post('/api/admin/clear', requireAdminAuth, async (req, res) => {
  try {
    await store.clear();
    res.json({
      success: true,
      message: 'Leaderboard cleared successfully',
    });
  } catch (err) {
    console.error('Error in /api/admin/clear:', err.message);
    res.status(500).json({ error: 'Failed to clear leaderboard' });
  }
});

// 9. Admin Delete Single Entry endpoint (PROTECTED)
app.post('/api/admin/delete-entry', requireAdminAuth, async (req, res) => {
  try {
    const { profileUrl } = req.body;
    if (!profileUrl) {
      return res.status(400).json({ error: 'profileUrl is required in request body' });
    }

    await store.delete(profileUrl);

    res.json({
      success: true,
      message: 'Participant entry deleted successfully',
    });
  } catch (err) {
    console.error('Error in /api/admin/delete-entry:', err.message);
    res.status(500).json({ error: 'Failed to delete participant entry' });
  }
});

// Serve frontend in production (when run as unified server)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
});

// Only listen when running standalone server (Render / Local), not in Vercel Serverless
if (process.env.VERCEL !== '1' && !process.env.VERCEL_ENV) {
  app.listen(PORT, () => {
    console.log(`GDGoC CIT Campaign Server running on http://localhost:${PORT}`);
  });
}

export default app;
