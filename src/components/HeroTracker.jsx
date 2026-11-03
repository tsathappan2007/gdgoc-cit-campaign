import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Link2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  User, 
  ShieldCheck, 
  Award, 
  Gift, 
  Loader2, 
  ExternalLink,
  Share2,
  BookmarkCheck,
  Sparkles,
  Zap,
  Flame,
  Radio
} from 'lucide-react';
import { GDGLogo } from './Navbar';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function HeroTracker({ onCheckProfile, loading, error, profileData, onOpenShareCard }) {
  const [inputUrl, setInputUrl] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Load saved profile URL on initial mount
  useEffect(() => {
    const saved = localStorage.getItem('cit_gdg_profile_url');
    if (saved) {
      setInputUrl(saved);
      // Auto-check on first load if saved
      onCheckProfile(saved, true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = inputUrl.trim();
    if (!clean) return;

    if (rememberMe) {
      localStorage.setItem('cit_gdg_profile_url', clean);
    } else {
      localStorage.removeItem('cit_gdg_profile_url');
    }

    onCheckProfile(clean);
  };

  const learnerName = profileData?.userName || 'Learner!';
  const avatarUrl = profileData?.avatarUrl;
  const completedCount = profileData ? profileData.completedCount : 0;
  const totalRequired = profileData ? profileData.totalRequired : 10;
  const percentage = profileData ? profileData.percentage : 0;

  const isM1 = completedCount >= 5;
  const isM2 = completedCount >= 10;
  const milestonesAchieved = (+isM1) + (+isM2);

  // Gamified Level & XP System
  const xp = completedCount * 100;
  let playerRank = { level: 1, title: 'Cloud Initiate', emoji: '🎮', badgeBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
  if (completedCount >= 10) {
    playerRank = { level: 'MAX', title: 'Campus Champion', emoji: '👑', badgeBg: 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-300/40 shadow-sm' };
  } else if (completedCount >= 8) {
    playerRank = { level: 5, title: 'Cloud Architect', emoji: '🚀', badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
  } else if (completedCount >= 5) {
    playerRank = { level: 4, title: 'Swag Hunter', emoji: '🎁', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
  } else if (completedCount >= 3) {
    playerRank = { level: 3, title: 'Cloud Practitioner', emoji: '⚡', badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
  } else if (completedCount >= 1) {
    playerRank = { level: 2, title: 'Cloud Explorer', emoji: '🌟', badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30' };
  }

  const triggerCelebrate = (e) => {
    e.stopPropagation();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
    });
  };

  let nextRewardText = '5 badges left';
  if (completedCount >= 10) {
    nextRewardText = 'All Unlocked! 🏆';
  } else if (completedCount >= 5) {
    const left = 10 - completedCount;
    nextRewardText = `${left} badge${left > 1 ? 's' : ''} left`;
  } else {
    const left = 5 - completedCount;
    nextRewardText = `${left} badge${left > 1 ? 's' : ''} left`;
  }

  return (
    <div className="bg-[#0b1329] text-white rounded-3xl border border-slate-800/80 p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      
      {/* Decorative Gamified Elements & Floating Orbs */}
      <div className="absolute top-10 left-12 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float-reverse" />
      <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Google Shapes */}
      <div className="absolute top-8 right-12 hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-[11px] font-bold text-slate-300 shadow-inner animate-float">
        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>CIT Cloud Season Live</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
        
        {/* Left Form Area */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          
          <div className="inline-flex items-center space-x-2 text-slate-200">
            <GDGLogo className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-200">
              {CAMPAIGN_CONFIG.chapterName} • {CAMPAIGN_CONFIG.shortProgramName}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Level Up Your{' '}
            <span className="relative inline-block font-serif italic text-[#FBBC05]">
              Cloud Quest
              <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#FBBC05]" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
                <path d="M2 16 Q 50 2 98 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Paste your Google Cloud Skills Boost public profile to track badges, unlock official Google swag milestones, and climb the campus leaderboard at <strong>{CAMPAIGN_CONFIG.collegeName}</strong>!
          </p>

          <form onSubmit={handleSubmit} className="pt-1">
            <div className="flex flex-col sm:flex-row items-stretch bg-white/95 rounded-2xl p-1.5 shadow-xl gap-2 max-w-xl border border-white/20">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Link2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Paste your Skills Boost profile link (e.g. cloudskillsboost.google/...)"
                  className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-xs sm:text-sm font-medium"
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || !inputUrl.trim()}
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 sm:py-3 bg-[#1a73e8] hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm transition-all transform-gpu hover:scale-102 shrink-0 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Check Progress</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>
            </div>

            {/* Radar Scan Indicator when Loading */}
            {loading && (
              <div className="mt-3.5 p-3 rounded-2xl bg-blue-950/70 border border-blue-800 text-blue-200 flex items-center space-x-3 text-xs sm:text-sm max-w-xl animate-pulse">
                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border border-blue-400 animate-ping opacity-75" />
                  <Radio className="w-4 h-4 text-blue-400 animate-spin" />
                </div>
                <span>Scanning Google Cloud Skills Boost for verified completion badges...</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-3 p-3 rounded-2xl bg-red-950/70 border border-red-800 text-red-200 flex items-start space-x-2.5 text-xs sm:text-sm max-w-xl">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Sub-bar options: Remember me + Help */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 max-w-xl">
              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-800"
                />
                <span className="flex items-center space-x-1 text-slate-300">
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Remember my link</span>
                </span>
              </label>

              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline font-medium cursor-pointer transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 mr-1" />
                <span>Need help with profile link?</span>
              </button>
            </div>

            {/* Help Dropdown Box */}
            {showHelp && (
              <div className="mt-3 p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-slate-300 text-xs space-y-1.5 max-w-xl animate-in fade-in">
                <div className="font-bold text-white flex items-center justify-between flex-wrap gap-2">
                  <span>How to make your Google Skills profile public:</span>
                  <a
                    href="https://www.cloudskillsboost.google/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-blue-400 hover:underline"
                  >
                    Go to Skills Boost <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
                <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                  <li>Sign in to <span className="font-semibold text-white">cloudskillsboost.google</span>.</li>
                  <li>Click your avatar at top right → select <span className="font-semibold text-white">Settings</span>.</li>
                  <li>Check <span className="font-semibold text-white">"Make profile public"</span> and save.</li>
                  <li>Copy your public profile URL (contains <code className="text-amber-300">/public_profiles/</code>) and paste it above!</li>
                </ol>
              </div>
            )}
          </form>

        </div>

        {/* Right Gamified Student Profile Card */}
        <div className="lg:col-span-6">
          <div className="bg-white/95 text-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/40 space-y-4 relative overflow-hidden backdrop-blur-md transform-gpu transition-all hover:shadow-blue-500/10">
            
            {/* Top Gamer Profile Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="relative shrink-0">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={learnerName}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-md ring-2 ring-blue-400/20"
                      onError={(e) => {
                        e.currentTarget.src = "https://www.gstatic.com/devrel-devsite/prod/v52a23e9cb3de7a61d6fb1e6a17b6a6bbfe3e04e84cbef70139b854378f85f54d/cloud/images/favicons/onecloud/super_g.png";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
                      <User className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                  )}

                  {/* Level Ring Tag */}
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-slate-900 text-amber-400 font-mono font-black text-[9px] shadow-xs">
                    L{playerRank.level}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Gamer Profile
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight truncate">
                    {learnerName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium truncate">
                    {CAMPAIGN_CONFIG.collegeName} • GDGoC
                  </p>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="shrink-0 flex flex-col items-end gap-1">
                <div className={`px-2.5 py-1 rounded-xl text-xs font-black border flex items-center space-x-1.5 whitespace-nowrap shadow-xs ${playerRank.badgeBg}`}>
                  <span>{playerRank.emoji}</span>
                  <span>{playerRank.title}</span>
                </div>
                
                {profileData && (
                  <button
                    type="button"
                    onClick={triggerCelebrate}
                    className="text-[11px] font-bold text-amber-600 hover:text-amber-700 inline-flex items-center space-x-1 transition-colors cursor-pointer"
                    title="Pop celebratory confetti!"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Celebrate</span>
                  </button>
                )}
              </div>
            </div>

            {/* XP Bar & Progress */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Cloud XP: <span className="font-black text-slate-900">{xp} / 1000 XP</span></span>
                </span>
                <span className="text-blue-600 font-black">
                  {percentage}% ({completedCount}/{totalRequired})
                </span>
              </div>
              
              <div className="w-full bg-slate-200/90 h-3 sm:h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#4285F4] via-[#6366F1] to-[#34A853] transition-all duration-700 rounded-full shadow-xs"
                  style={{ width: `${Math.min(100, Math.max(completedCount > 0 ? 6 : 0, percentage))}%` }}
                />
              </div>
            </div>

            {/* 3 Metric Summary Boxes */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1 hover:border-emerald-200 transition-colors">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                  Verified
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-900">
                  {completedCount} <span className="text-[10px] text-slate-400 font-normal">/10</span>
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1 hover:border-amber-200 transition-colors">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                  Milestones
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-900">
                  {milestonesAchieved} <span className="text-[10px] text-slate-400 font-normal">/2</span>
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1 hover:border-purple-200 transition-colors">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                  Next Loot
                </span>
                <span className="text-xs font-extrabold text-slate-900 truncate">
                  {nextRewardText}
                </span>
              </div>
            </div>

            {/* Share Achievement Card Button */}
            {profileData && (
              <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">
                  Claimed {completedCount} official Google badges
                </span>
                <button
                  type="button"
                  onClick={onOpenShareCard}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all transform-gpu hover:scale-102 cursor-pointer shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Share Player Pass</span>
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
