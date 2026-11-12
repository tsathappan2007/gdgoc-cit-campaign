import React, { useState, useEffect } from 'react';
import { Gamepad2, X, Flame, ArrowRight, Clock, Sparkles } from 'lucide-react';

export function CampaignDeadlineBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show banner smoothly in the center with backdrop blur after a brief delay on page load
    const isDismissed = sessionStorage.getItem('cit_deadline_banner_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('cit_deadline_banner_dismissed', 'true');
  };

  const handleSpeedrun = () => {
    handleDismiss();
    const el = document.getElementById('badges-section') || document.getElementById('leaderboard-section');
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
      onClick={handleDismiss}
    >
      <div 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white border-2 border-amber-400/70 shadow-2xl shadow-amber-500/20 ring-4 ring-amber-400/15 max-w-lg w-full animate-modal-zoom max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Subtle Cyber Glow Orbs */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges & Close Button */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider flex items-center space-x-1.5 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-red-600 animate-pulse fill-red-600" />
              <span>Quest Closing</span>
            </span>
            <span className="text-xs font-mono text-amber-300 font-bold px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Ends 23rd Nov</span>
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Body */}
        <div className="mt-5 space-y-3 relative z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
              <Gamepad2 className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                Final Boss Inbound
              </span>
              <h3 className="font-black text-xl sm:text-2xl text-white tracking-tight leading-tight">
                Server Closes on Nov 23rd! ⏳
              </h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2 mt-3">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Yo Cloud Champion! 🎮 Just a chill heads-up with a slight panic warning: this campaign officially wraps up on <span className="font-black text-amber-300 underline decoration-amber-400 underline-offset-2">23rd November</span>.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              If you've been taking it easy, it's time to speedrun your badges before the portal locks and your free <span className="text-slate-200 font-bold">Google Water Bottle & T-Shirt goodies</span> vanish into the void! 🏃‍♂️💨
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5 relative z-10">
          <button
            onClick={handleSpeedrun}
            className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/25 cursor-pointer transform-gpu hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Speedrun Badges Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDismiss}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            I'm On It 👍
          </button>
        </div>

      </div>
    </div>
  );
}
