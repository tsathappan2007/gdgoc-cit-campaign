import React, { useState, useEffect } from 'react';
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
  BookmarkCheck
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
    <div className="bg-[#0f172a] text-white rounded-2xl sm:rounded-3xl border border-slate-800 p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
      
      {/* Decorative accent shapes */}
      <div className="absolute top-6 left-10 w-3 h-1 bg-[#4285F4] rounded-full rotate-45 opacity-60" />
      <div className="absolute bottom-10 left-1/3 w-3 h-1 bg-[#FBBC05] rounded-full -rotate-12 opacity-60" />
      <div className="absolute top-1/2 left-2 w-2 h-2 bg-[#EA4335] rounded-full opacity-60" />

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
            Check Your{' '}
            <span className="relative inline-block font-serif italic text-[#FBBC05]">
              Progress
              <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#FBBC05]" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
                <path d="M2 16 Q 50 2 98 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Enter your Google Cloud Skills Boost public profile link to view your verified badges, milestone statuses, and rewards at <strong>{CAMPAIGN_CONFIG.collegeName}</strong>.
          </p>

          <form onSubmit={handleSubmit} className="pt-1">
            <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-xl sm:rounded-2xl p-1.5 shadow-xl gap-2 max-w-xl">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Link2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Paste your Skills Boost profile link (e.g. cloudskillsboost.google/public_profiles/...)"
                  className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-xs sm:text-sm font-medium"
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || !inputUrl.trim()}
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 sm:py-3 bg-[#1a73e8] hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg sm:rounded-xl shadow-md text-xs sm:text-sm transition-colors shrink-0 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <span>Check Progress</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-200 flex items-start space-x-2.5 text-xs sm:text-sm max-w-xl">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Sub-bar options: Remember me + Help */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 max-w-xl">
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
                className="inline-flex items-center text-blue-400 hover:underline font-medium cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 mr-1" />
                <span>Need help with profile link?</span>
              </button>
            </div>

            {/* Help Dropdown Box */}
            {showHelp && (
              <div className="mt-3 p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 text-xs space-y-1.5 max-w-xl animate-fadeIn">
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

        {/* Right Student Profile Card */}
        <div className="lg:col-span-6">
          <div className="bg-white/95 text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-2xl border border-white/20 space-y-4">
            
            {/* Header: Avatar, Name, Status Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="relative shrink-0">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={learnerName}
                      className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-blue-500 shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = "https://www.gstatic.com/devrel-devsite/prod/v52a23e9cb3de7a61d6fb1e6a17b6a6bbfe3e04e84cbef70139b854378f85f54d/cloud/images/favicons/onecloud/super_g.png";
                      }}
                    />
                  ) : (
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center text-[#1a73e8]">
                      <User className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block" style={{ fontSize: '10px' }}>
                    Welcome back,
                  </span>
                  <h3 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight truncate">
                    {learnerName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                    {CAMPAIGN_CONFIG.collegeName} • GDGoC
                  </p>
                </div>
              </div>

              {profileData && (
                <div className="shrink-0 ml-2">
                  {isM2 ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 whitespace-nowrap">
                      Champion 🏆
                    </span>
                  ) : isM1 ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 whitespace-nowrap">
                      Milestone 1 ✅
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                      In Progress 🚀
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* 3 Metric Summary Boxes */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider leading-tight" style={{ fontSize: '9px' }}>
                  Total Badges
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-900">
                  {completedCount}
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider leading-tight" style={{ fontSize: '9px' }}>
                  Milestones
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-900">
                  {milestonesAchieved} / 2
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider leading-tight" style={{ fontSize: '9px' }}>
                  Next Reward
                </span>
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {nextRewardText}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                <span>Curriculum Progress</span>
                <span className="text-blue-600 font-bold">
                  {percentage}% ({completedCount}/{totalRequired})
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 transition-all duration-700 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(completedCount > 0 ? 6 : 0, percentage))}%` }}
                />
              </div>
            </div>

            {/* Share Achievement Card Button */}
            {profileData && (
              <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Earned {completedCount} badges at CIT!
                </span>
                <button
                  onClick={onOpenShareCard}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1a73e8] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share My Pass</span>
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
