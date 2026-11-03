import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'participants.json');

class Store {
  constructor() {
    this.participants = new Map();
    this.loadFromDisk();
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
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

  clear() {
    this.participants.clear();
    this.saveToDisk();
  }

  get(profileUrl) {
    return this.participants.get(profileUrl) || null;
  }

  upsert(participant) {
    const updated = {
      ...participant,
      lastChecked: new Date().toISOString(),
    };
    this.participants.set(participant.profileUrl, updated);
    this.saveToDisk();
    return updated;
  }

  getLeaderboard() {
    const all = Array.from(this.participants.values());
    // Sort descending by completedCount, then by lastChecked timestamp
    all.sort((a, b) => {
      if (b.completedCount !== a.completedCount) {
        return b.completedCount - a.completedCount;
      }
      return new Date(b.lastChecked) - new Date(a.lastChecked);
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

  getStats() {
    const all = Array.from(this.participants.values());
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

  exportCsv() {
    const leaderboard = this.getLeaderboard();
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
