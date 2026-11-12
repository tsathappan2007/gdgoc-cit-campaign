import React, { useState, useEffect } from 'react';
import { Gamepad2, X, Flame, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

export function CampaignDeadlineBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show banner smoothly after a brief delay when page loads
    const isDismissed = sessionStorage.getItem('cit_deadline_banner_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('cit_deadline_banner_dismissed', 'true');
  };

  const handleSpeedrun = () => {
    const el = document.getElementById('badges-section') || document.getElementById('leaderboard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    handleDismiss();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-md animate-slide-up-fade">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-5 sm:p-6 text-white border-2 border-amber-400/60 shadow-2xl shadow-amber-500/10 backdrop-blur-xl ring-4 ring-amber-400/10">
        
        {/* Subtle Cyber Glow Orbs */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow-sm">
              <Flame className="w-3 h-3 text-red-600 animate-pulse fill-red-600" />
              <span>Quest Closing</span>
            </span>
            <span className="text-[11px] font-mono text-amber-300 font-bold flex items-center space-x-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Nov 23rd Deadline</span>
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-3 space-y-2 relative z-10">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-5 h-5 text-amber-400 shrink-0" />
            <h4 className="font-black text-base sm:text-lg text-white tracking-tight">
              Final Boss Alert: Server Closes Nov 23! ⏳
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Yo Cloud Champion! 🎮 Just a chill heads-up with a slight panic warning: the campaign officially wraps up on <span className="font-extrabold text-amber-300 underline decoration-amber-400/50 underline-offset-2">23rd November</span>.
          </p>

          <p className="text-[11px] sm:text-xs text-slate-400 leading-normal">
            If you've been taking it easy, it's time to speedrun your badges before the portal locks and your free Google Water Bottle & T-Shirt goodies vanish into the void! 🏃‍♂️💨
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center space-x-2 pt-1 relative z-10">
          <button
            onClick={handleSpeedrun}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer transform-gpu hover:-translate-y-0.5"
          >
            <span>Speedrun Badges</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDismiss}
            className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
          >
            I'm On It 👍
          </button>
        </div>

      </div>
    </div>
  );
}
