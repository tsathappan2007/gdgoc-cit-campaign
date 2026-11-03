import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { HeroTracker } from './components/HeroTracker';
import { Milestones } from './components/Milestones';
import { BadgesChecklist } from './components/BadgesChecklist';
import { Leaderboard } from './components/Leaderboard';
import { AboutModal } from './components/AboutModal';
import { AchievementCard } from './components/AchievementCard';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State for Learner Dashboard
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [defaultBadges, setDefaultBadges] = useState([]);
  const [stats, setStats] = useState(null);

  // Modals state
  const [showAbout, setShowAbout] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  // Load default badges and stats on mount
  useEffect(() => {
    fetch('/api/badges')
      .then(res => res.json())
      .then(data => {
        if (data.badges) setDefaultBadges(data.badges);
      })
      .catch(err => console.error('Error fetching badges list:', err));

    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.stats) setStats(data.stats);
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  // Confetti celebrations matching original DCRUST animation
  const triggerConfetti = (isMilestone2, isMilestone1) => {
    if (isMilestone2) {
      const duration = 3000;
      const end = Date.now() + duration;
      const opts = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

      const interval = setInterval(() => {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = (timeLeft / duration) * 50;
        confetti({
          ...opts,
          particleCount,
          origin: { x: 0.2, y: 0.6 },
          colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
        });
        confetti({
          ...opts,
          particleCount,
          origin: { x: 0.8, y: 0.6 },
          colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
        });
      }, 250);
    } else if (isMilestone1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34A853', '#4285F4', '#FBBC05'],
      });
    }
  };

  const handleCheckProfile = async (profileUrl, silent = false) => {
    if (!silent) setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/check-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileUrl }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to check profile');
      }

      setProfileData(json.data);

      if (json.data?.milestone2?.isCompleted) {
        triggerConfetti(true, true);
      } else if (json.data?.milestone1?.isCompleted) {
        triggerConfetti(false, true);
      }

      // Refresh stats
      fetch('/api/stats')
        .then(r => r.json())
        .then(d => { if (d.stats) setStats(d.stats); });

    } catch (err) {
      console.error(err);
      if (!silent) setError(err.message);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const scrollToLeaderboard = () => {
    const el = document.getElementById('leaderboard-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor />
      {currentPath.startsWith('/admin') ? (
        <AdminPage onNavigateHome={() => navigateTo('/')} />
      ) : (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
          
          {/* Modals */}
          {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
          {showShareCard && (
            <AchievementCard
              profileData={profileData}
              onClose={() => setShowShareCard(false)}
            />
          )}

          {/* Top Navbar */}
          <Navbar
            onAboutClick={() => setShowAbout(true)}
            onLeaderboardClick={scrollToLeaderboard}
          />

          {/* Live Announcement Banner */}
          <AnnouncementBanner />

          {/* Main Learner Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 md:py-10 space-y-5 sm:space-y-8 md:space-y-10">
            
            {/* Hero & Profile Checker */}
            <HeroTracker
              onCheckProfile={handleCheckProfile}
              loading={loading}
              error={error}
              profileData={profileData}
              onOpenShareCard={() => setShowShareCard(true)}
            />

            {/* Milestones (5 & 10 badges) */}
            <Milestones
              completedCount={profileData ? profileData.completedCount : 0}
            />

            {/* 10 Skill Badges Interactive Checklist */}
            <BadgesChecklist
              checklist={
                profileData
                  ? profileData.checklist
                  : defaultBadges.map(b => ({
                      id: b.id,
                      requiredTitle: b.title,
                      category: b.type,
                      courseUrl: b.courseUrl,
                      credits: b.credits,
                      isCompleted: false,
                      earnedDate: null,
                    }))
              }
            />

            {/* Campus Leaderboard */}
            <Leaderboard
              onSelectProfile={(url) => {
                handleCheckProfile(url);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

          </main>

          {/* Footer */}
          <Footer />

        </div>
      )}
    </>
  );
}

export default App;
