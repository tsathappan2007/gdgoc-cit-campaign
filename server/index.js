import fs from 'fs';
import path from 'path';
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

// 2. Profile Check endpoint
app.post('/api/check-profile', async (req, res) => {
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
      token: 'admin-auth-token-cit-gdg',
      message: 'Authentication successful',
    });
  }

  return res.status(401).json({
    error: 'Invalid Admin PIN. Please check with your GDGoC Lead.',
  });
});

// 6. Admin full roster data
app.get('/api/admin/roster', async (req, res) => {
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

// 7. Admin CSV export endpoint
app.get('/api/admin/export', async (req, res) => {
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

// 8. Admin Clear Leaderboard endpoint
app.post('/api/admin/clear', async (req, res) => {
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
