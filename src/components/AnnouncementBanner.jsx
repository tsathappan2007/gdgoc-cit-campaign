import React from 'react';
import { Sparkles } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function AnnouncementBanner() {
  if (!CAMPAIGN_CONFIG.announcement?.enabled) return null;

  const message = CAMPAIGN_CONFIG.announcement.message;
  const tickerItems = [
    message,
    "Complete 5 Badges → Earn Google Water Bottle",
    "Complete 10 Badges → Earn T-Shirt + Goodies Box",
    `Organized by ${CAMPAIGN_CONFIG.chapterName} • ${CAMPAIGN_CONFIG.collegeName}`,
  ];

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-2 shadow-inner overflow-hidden relative flex items-center">
      
      {/* Pinned Badge on the Left with Gradient Fade */}
      <div className="relative z-10 pl-4 pr-3 sm:pl-6 bg-gradient-to-r from-blue-700 via-blue-700 to-transparent flex items-center shrink-0">
        <span className="bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider shrink-0 flex items-center space-x-1 shadow-xs">
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>{CAMPAIGN_CONFIG.announcement.badge}</span>
        </span>
        <div className="w-6 h-full bg-gradient-to-r from-blue-700 to-transparent pointer-events-none" />
      </div>

      {/* Continuously Moving Marquee Track */}
      <div className="overflow-hidden flex-1 relative flex items-center">
        <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm font-medium text-blue-100 flex items-center space-x-8">
          
          {/* First set of items */}
          <div className="flex items-center space-x-8 shrink-0">
            {tickerItems.map((item, idx) => (
              <span key={`t1-${idx}`} className="flex items-center space-x-2">
                <span>{item}</span>
                <span className="text-amber-400 font-bold">•</span>
              </span>
            ))}
          </div>

          {/* Duplicate set for seamless looping */}
          <div className="flex items-center space-x-8 shrink-0" aria-hidden="true">
            {tickerItems.map((item, idx) => (
              <span key={`t2-${idx}`} className="flex items-center space-x-2">
                <span>{item}</span>
                <span className="text-amber-400 font-bold">•</span>
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Right subtle fade mask */}
      <div className="w-8 h-full absolute right-0 top-0 bg-gradient-to-l from-blue-800 to-transparent pointer-events-none z-10" />

    </div>
  );
}
