import React from 'react';
import { GoogleLogo, GDGLogo } from './Navbar';
import { CAMPAIGN_CONFIG } from '../config/campaign';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-5 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        
        {/* Left Branding */}
        <div className="flex items-center space-x-2.5">
          <GoogleLogo className="h-5 sm:h-6 w-auto" />
          <span className="text-sm font-semibold text-slate-700 tracking-tight">
            {CAMPAIGN_CONFIG.shortProgramName}
          </span>
        </div>

        {/* Right Info & Socials */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 text-xs sm:text-sm text-slate-600 font-medium">
          
          <div className="flex items-center space-x-2">
            <a
              href={CAMPAIGN_CONFIG.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center transition-colors"
              title="GDG CIT Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href={CAMPAIGN_CONFIG.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
              title="GDG CIT LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          </div>

          <span className="hidden sm:block text-slate-300">|</span>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="text-slate-500">Built by</span>
            <a
              href={CAMPAIGN_CONFIG.credits.builtByUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-900 hover:text-[#4285F4] transition-colors cursor-pointer"
              title="View Sathappan T's LinkedIn"
            >
              {CAMPAIGN_CONFIG.credits.builtBy}
            </a>
            <span className="text-slate-300">|</span>
            <a
              href={CAMPAIGN_CONFIG.chapterUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 font-bold text-slate-900 hover:text-[#4285F4] transition-colors cursor-pointer"
              title="Visit GDG on Campus CIT Website"
            >
              <GDGLogo className="w-4 h-4 shrink-0" />
              <span>{CAMPAIGN_CONFIG.chapterName}</span>
            </a>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-semibold">{CAMPAIGN_CONFIG.collegeName}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
