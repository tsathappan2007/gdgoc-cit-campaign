import React from 'react';
import { Info, Trophy } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

// Google Brand Wordmark SVG
export function GoogleLogo({ className = "h-6 sm:h-7 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
      <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
      <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
      <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" />
    </svg>
  );
}

// Google Developer Groups Community Icon SVG
export function GDGLogo({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="35 83 252 144" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Google Developer Groups">
      <rect x="-56" y="-22.85" width="112" height="45.7" rx="22.85" fill="#EA4335" transform="translate(95.5, 136) rotate(-35.7)" />
      <rect x="-56" y="-22.85" width="112" height="45.7" rx="22.85" fill="#4285F4" transform="translate(95.5, 174) rotate(35.7)" />
      <rect x="-56" y="-22.85" width="112" height="45.7" rx="22.85" fill="#FBBC04" transform="translate(226.5, 174) rotate(-35.7)" />
      <rect x="-56" y="-22.85" width="112" height="45.7" rx="22.85" fill="#34A853" transform="translate(226.5, 136) rotate(35.7)" />
    </svg>
  );
}

export function Navbar({ onAboutClick, onLeaderboardClick }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          
          {/* Left Brand Area */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <GoogleLogo className="h-5 sm:h-6 md:h-7 w-auto shrink-0" />
            <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
              <span className="hidden xs:block text-sm sm:text-base md:text-lg font-semibold text-slate-500 tracking-tight truncate">
                {CAMPAIGN_CONFIG.shortProgramName}
              </span>
              <span className="hidden sm:block text-slate-300 font-light text-lg">|</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight truncate">
                Progress Checker
              </span>
            </div>
          </div>

          {/* Right Chapter & Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Built by Credit */}
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs text-slate-400 font-medium">Built by</span>
              <a
                href={CAMPAIGN_CONFIG.credits.builtByUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-slate-900 leading-tight hover:text-[#4285F4] transition-colors cursor-pointer"
                title="View Sathappan T's LinkedIn"
              >
                {CAMPAIGN_CONFIG.credits.builtBy}
              </a>
            </div>
            <span className="hidden lg:block text-slate-300 font-light text-lg">|</span>

            {/* College & Chapter Badge */}
            <a
              href={CAMPAIGN_CONFIG.chapterUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 py-1 px-2 sm:px-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-200 shadow-2xs transition-all cursor-pointer group"
              title="Visit GDG on Campus CIT Website"
            >
              <GDGLogo className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#4285F4] transition-colors tracking-tight leading-none">
                  {CAMPAIGN_CONFIG.chapterName}
                </span>
                <span className="font-semibold text-slate-500 leading-tight truncate max-w-[120px] sm:max-w-none" style={{ fontSize: '10px' }}>
                  {CAMPAIGN_CONFIG.collegeName}
                </span>
              </div>
            </a>

            {/* Leaderboard Button */}
            <button
              onClick={onLeaderboardClick}
              className="hidden sm:flex items-center space-x-1 py-1.5 px-2.5 sm:px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors font-semibold text-xs sm:text-sm cursor-pointer border border-amber-200"
              title="Campus Leaderboard"
            >
              <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Leaderboard</span>
            </button>

            {/* About Modal Button */}
            <button
              onClick={onAboutClick}
              className="flex items-center space-x-1 py-1.5 px-2.5 sm:px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors font-semibold text-xs sm:text-sm cursor-pointer border border-blue-100"
              title="About this program"
            >
              <Info className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">About</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
