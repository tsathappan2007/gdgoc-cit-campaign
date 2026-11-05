import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDatabase, isMongoConfigured } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;
const DATA_FILE = isVercel ? '/tmp/participants.json' : path.join(__dirname, 'participants.json');
let lastMongoErrorTime = 0;
function logMongoError(context, err) {
  const now = Date.now();
  if (now - lastMongoErrorTime > 10000) {
    console.error(`[MongoDB] ${context}: ${err.message}`);
    lastMongoErrorTime = now;
  }
}

class Store {
  constructor() {
    this.participants = new Map();
    this.loadFromDisk();
    this.hasSeededMongo = false;
  }

  loadFromDisk() {
    try {
      let fileToRead = DATA_FILE;
      if (!fs.existsSync(fileToRead) && fs.existsSync(SEED_FILE)) {
        fileToRead = SEED_FILE;
      }
      if (fs.existsSync(fileToRead)) {
        const raw = fs.readFileSync(fileToRead, 'utf-8');
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          list.forEach(p => {
            if (p.profileUrl) {
              this.participants.set(p.profileUrl, p);
            }
          });
        }
      }
    } catch (err) {
      console.warn('Could not load participants cache from disk:', err.message);
    }
  }

  saveToDisk() {
    try {
      const list = Array.from(this.participants.values());
      fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
    } catch (err) {
      console.warn('Could not persist participants cache to disk:', err.message);
    }
  }

  async ensureMongoSeeded() {
    if (this.hasSeededMongo || !isMongoConfigured()) return;
    try {
      const db = await getDatabase();
      if (db) {
        // Enforce unique index on profileUrl for instant lookups and duplicate prevention
        try {
          await db.collection('participants').createIndex({ profileUrl: 1 }, { unique: true });
        } catch (idxErr) {
          // Index might already exist or duplicates being deduplicated
        }

        const count = await db.collection('participants').countDocuments();
        if (count === 0 && this.participants.size > 0) {
          const list = Array.from(this.participants.values());
          await db.collection('participants').insertMany(list);
          console.log(`[MongoDB] Initialized database with ${list.length} seeded participants.`);
        }
        this.hasSeededMongo = true;
      }
    } catch (err) {
      console.warn('[MongoDB] Auto-seeding check skipped/failed:', err.message);
    }
  }

  async clear() {
    this.participants.clear();
    this.saveToDisk();

    if (isMongoConfigured()) {
      try {
        const db = await getDatabase();
        if (db) {
          await db.collection('participants').deleteMany({});
        }
      } catch (err) {
        console.error('[MongoDB] Error clearing collection:', err.message);
      }
    }
  }

  async get(profileUrl) {
    if (isMongoConfigured()) {
      try {
        const db = await getDatabase();
        if (db) {
          const doc = await db.collection('participants').findOne({ profileUrl });
          if (doc) {
            const { _id, ...cleanDoc } = doc;
            return cleanDoc;
          }
        }
      } catch (err) {
        console.error('[MongoDB] Error fetching participant:', err.message);
      }
    }
    return this.participants.get(profileUrl) || null;
  }

  async upsert(participant) {
    const existing = await this.get(participant.profileUrl);
    const now = new Date().toISOString();

    const updated = {
      ...participant,
      firstEnrolled: existing?.firstEnrolled || now,
      lastChecked: now,
    };

    // Update in-memory Map
    this.participants.set(participant.profileUrl, updated);

    if (isMongoConfigured()) {
      try {
        const db = await getDatabase();
        if (db) {
          await db.collection('participants').updateOne(
            { profileUrl: participant.profileUrl },
            { $set: updated },
            { upsert: true }
          );
          return updated;
        }
      } catch (err) {
        logMongoError('Error in upsert, falling back to disk', err);
      }
    }

    // Fallback to disk if MongoDB is not configured or fails
    this.saveToDisk();
    return updated;
  }

  async getLeaderboard() {
    await this.ensureMongoSeeded();

    let all = [];
    if (isMongoConfigured()) {
      try {
        const db = await getDatabase();
        if (db) {
          all = await db.collection('participants').find({}).toArray();
        }
      } catch (err) {
        logMongoError('Error fetching leaderboard, falling back to cache', err);
        all = Array.from(this.participants.values());
      }
    } else {
      all = Array.from(this.participants.values());
    }

    // Sort descending by completedCount, with fair tie-breaker: earlier achiever holds higher rank
    all.sort((a, b) => {
      if (b.completedCount !== a.completedCount) {
        return (b.completedCount || 0) - (a.completedCount || 0);
      }
      const timeA = new Date(a.firstEnrolled || a.lastChecked || 0).getTime();
      const timeB = new Date(b.firstEnrolled || b.lastChecked || 0).getTime();
      return timeA - timeB;
    });

    return all.map((p, index) => ({
      rank: index + 1,
      userName: p.userName || 'Anonymous Learner',
      avatarUrl: p.avatarUrl || null,
      completedCount: p.completedCount || 0,
      totalRequired: p.totalRequired || 10,
      percentage: p.percentage || 0,
      milestone1: p.milestone1?.isCompleted || false,
      milestone2: p.milestone2?.isCompleted || false,
      lastChecked: p.lastChecked,
      profileUrl: p.profileUrl,
    }));
  }

  async getStats() {
    await this.ensureMongoSeeded();

    let all = [];
    if (isMongoConfigured()) {
      try {
        const db = await getDatabase();
        if (db) {
          all = await db.collection('participants').find({}).toArray();
        }
      } catch (err) {
        logMongoError('Error fetching stats, falling back to cache', err);
        all = Array.from(this.participants.values());
      }
    } else {
      all = Array.from(this.participants.values());
    }

    const totalParticipants = all.length;
    const milestone1Achieved = all.filter(p => p.milestone1?.isCompleted).length;
    const milestone2Achieved = all.filter(p => p.milestone2?.isCompleted).length;
    const totalBadgesEarned = all.reduce((sum, p) => sum + (p.completedCount || 0), 0);

    return {
      totalParticipants,
      milestone1Achieved,
      milestone2Achieved,
      totalBadgesEarned,
      chapterTier: milestone2Achieved >= 80 ? 'Tier 3 (Gold)' : milestone2Achieved >= 50 ? 'Tier 2 (Silver)' : milestone1Achieved >= 30 ? 'Tier 1 (Bronze)' : 'Initiating'
    };
  }

  async exportCsv() {
    const leaderboard = await this.getLeaderboard();
    const headers = ['Rank', 'Name', 'Completed Badges', 'Total Badges', 'Percentage', 'Milestone 1', 'Milestone 2', 'Profile URL', 'Last Checked'];
    const rows = leaderboard.map(l => [
      l.rank,
      `"${(l.userName || '').replace(/"/g, '""')}"`,
      l.completedCount,
      l.totalRequired,
      `${l.percentage}%`,
      l.milestone1 ? 'YES' : 'NO',
      l.milestone2 ? 'YES' : 'NO',
      `"${l.profileUrl}"`,
      l.lastChecked
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}

export const store = new Store();
