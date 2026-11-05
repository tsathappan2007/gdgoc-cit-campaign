import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load required badges
const badgesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'badges.json'), 'utf-8')
);

// Helper to normalize strings for comparison (lowercased, punctuation removed, excess whitespace stripped)
function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getCurriculumBadges() {
  return badgesData;
}

export async function scrapeProfile(profileUrl) {
  if (!profileUrl || typeof profileUrl !== 'string') {
    throw new Error('Please provide a valid Google Cloud Skills Boost public profile URL');
  }

  const cleanUrl = profileUrl.trim();
  const profileUrlPattern = /^https?:\/\/(www\.)?(cloudskillsboost\.google|skills\.google)\/public_profiles\/[a-zA-Z0-9_-]+/i;
  if (!profileUrlPattern.test(cleanUrl) && !cleanUrl.endsWith('/demo') && !cleanUrl.includes('demo-user')) {
    throw new Error('Invalid URL format. Please paste your complete Google Cloud Skills Boost public profile URL (e.g. https://www.skills.google/public_profiles/...)');
  }

  // Support demo mode for testing without needing external web network
  if (cleanUrl.endsWith('/demo') || cleanUrl.includes('demo-user')) {
    return createDemoProfile(cleanUrl);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000); // 9-second timeout to avoid Vercel 10s cutoff

  try {
    const response = await fetch(cleanUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Profile not found. Make sure your profile link is correct and set to Public in settings.');
      }
      throw new Error(`Google Cloud Skills Boost returned status ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract Learner Name
    let userName = $('h1.ql-headline-1').text().trim() ||
                   $('.ql-headline-1').first().text().trim() ||
                   $('h1').first().text().trim() ||
                   'Google Cloud Learner';

    // Remove any extra trailing badges or titles
    userName = userName.replace(/\s+/g, ' ').trim();

    // Extract Avatar Image
    let avatarUrl = $('.avatar img').attr('src') ||
                    $('.profile-avatar img').attr('src') ||
                    $('img.ql-avatar-image').attr('src') ||
                    $('img[alt*="avatar"]').attr('src') ||
                    null;

    // Parse earned badges
    const earnedBadgesMap = new Map();

    // Badge cards selector on skills boost
    $('.profile-badge, .badge-item, .public-profile-badge, .ql-badge').each((_, el) => {
      const card = $(el);
      const title = card.find('.ql-title-medium, .badge-title, h3, .title').first().text().trim() ||
                    card.find('span').first().text().trim();

      const earnedText = card.find('.ql-body-medium, .badge-date, .date, time').text().trim();
      
      if (title) {
        const norm = normalizeText(title);
        earnedBadgesMap.set(norm, {
          rawTitle: title,
          earnedDate: earnedText || 'Earned on profile',
        });
      }
    });

    // Also look for general badge titles if specific classes didn't match
    if (earnedBadgesMap.size === 0) {
      $('span.ql-title-medium').each((_, el) => {
        const title = $(el).text().trim();
        if (title) {
          const norm = normalizeText(title);
          earnedBadgesMap.set(norm, {
            rawTitle: title,
            earnedDate: 'Earned on profile',
          });
        }
      });
    }

    // Match against the 10 official badges
    let completedCount = 0;
    const checklist = badgesData.map(requiredBadge => {
      const requiredNorm = normalizeText(requiredBadge.title);
      
      let isCompleted = false;
      let earnedDate = null;

      // Exact or safe partial match (prevents false matches from short generic badge names)
      for (const [earnedNorm, earnedData] of earnedBadgesMap.entries()) {
        const isExactMatch = earnedNorm === requiredNorm;
        const earnedContainsRequired = earnedNorm.includes(requiredNorm);
        const requiredContainsEarned = earnedNorm.length >= 20 && requiredNorm.includes(earnedNorm);

        if (isExactMatch || earnedContainsRequired || requiredContainsEarned) {
          isCompleted = true;
          earnedDate = earnedData.earnedDate;
          break;
        }
      }

      if (isCompleted) {
        completedCount++;
      }

      return {
        id: requiredBadge.id,
        requiredTitle: requiredBadge.title,
        category: requiredBadge.type,
        courseUrl: requiredBadge.courseUrl,
        credits: requiredBadge.credits,
        isCompleted,
        earnedDate,
      };
    });

    const totalRequired = badgesData.length; // 10
    const percentage = Math.round((completedCount / totalRequired) * 100);

    const milestone1 = {
      isCompleted: completedCount >= 5,
      badgesRemaining: Math.max(0, 5 - completedCount),
    };

    const milestone2 = {
      isCompleted: completedCount >= 10,
      badgesRemaining: Math.max(0, 10 - completedCount),
    };

    return {
      profileUrl: cleanUrl,
      userName,
      avatarUrl,
      completedCount,
      totalRequired,
      percentage,
      milestone1,
      milestone2,
      checklist,
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Google Cloud Skills Boost took too long to respond (>9s). Please verify your connection and try again.');
    }
    console.error('Scraping error:', err.message);
    throw new Error(err.message || 'Unable to fetch public profile. Please verify that the profile is public.');
  } finally {
    clearTimeout(timeoutId);
  }
}

function createDemoProfile(cleanUrl) {
  const completedCount = 7;
  const checklist = badgesData.map((b, idx) => ({
    id: b.id,
    requiredTitle: b.title,
    category: b.type,
    courseUrl: b.courseUrl,
    credits: b.credits,
    isCompleted: idx < completedCount,
    earnedDate: idx < completedCount ? 'Oct 28, 2024' : null,
  }));

  return {
    profileUrl: cleanUrl,
    userName: 'CIT Cloud Achiever',
    avatarUrl: null,
    completedCount,
    totalRequired: 10,
    percentage: 70,
    milestone1: { isCompleted: true, badgesRemaining: 0 },
    milestone2: { isCompleted: false, badgesRemaining: 3 },
    checklist,
  };
}
