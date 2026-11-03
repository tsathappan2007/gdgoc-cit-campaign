import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCurriculumBadges, scrapeProfile } from './scraper.js';
import { store } from './store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    // Save/update in store
    store.upsert(data);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error('Error in /api/check-profile:', err.message);
    res.status(400).json({
      error: err.message || 'Failed to check profile. Ensure profile is public.',
    });
  }
});

// 3. Leaderboard endpoint
app.get('/api/leaderboard', (req, res) => {
  const leaderboard = store.getLeaderboard();
  res.json({
    success: true,
    leaderboard,
    count: leaderboard.length,
  });
});

// 4. Chapter stats endpoint
app.get('/api/stats', (req, res) => {
  const stats = store.getStats();
  res.json({
    success: true,
    stats,
  });
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
app.get('/api/admin/roster', (req, res) => {
  const leaderboard = store.getLeaderboard();
  res.json({
    success: true,
    roster: leaderboard,
    count: leaderboard.length,
  });
});

// 7. Admin CSV export endpoint
app.get('/api/admin/export', (req, res) => {
  const csv = store.exportCsv();
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="gdgoc_cit_campaign_roster.csv"');
  res.send(csv);
});

// Serve frontend in production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`GDGoC CIT Campaign Server running on http://localhost:${PORT}`);
});
