import React from 'react';
import { X, ExternalLink, ChevronRight, MessageCircle, Ticket, Info, Check } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function AboutModal({ onClose }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/65 backdrop-blur-sm animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="bg-white w-full sm:max-w-lg sm:mx-4 sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90dvh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 sm:px-6 sm:py-5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-white font-bold text-base sm:text-lg leading-tight">
              {CAMPAIGN_CONFIG.programName}
            </h2>
            <p className="text-blue-200 text-xs mt-0.5">
              {CAMPAIGN_CONFIG.chapterName} • {CAMPAIGN_CONFIG.collegeName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors shrink-0 ml-3 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-4 py-4 sm:px-6 sm:py-5 space-y-4">
          
          {/* About Program */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              About the Program
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>{CAMPAIGN_CONFIG.programName}</strong> is a structured learning initiative by Google Developer Groups where participants complete curated Google Cloud skill badges to earn real-world skills, certificates, and exciting official Google goodies.
            </p>

            <div className="mt-2.5 space-y-1.5">
              <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
                <span className="shrink-0">🎯</span>
                <span>Complete <strong>5 badges</strong> → Earn a <strong>Google Water Bottle</strong></span>
              </div>
              <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
                <span className="shrink-0">🏆</span>
                <span>Complete <strong>all 10 badges</strong> → Earn a <strong>T-Shirt + Goodies Box</strong></span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* How to Use */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              How to Check Your Progress
            </h3>
            <ol className="space-y-1 text-xs sm:text-sm text-slate-600 list-decimal list-inside">
              <li>
                Visit your{' '}
                <a
                  href="https://www.cloudskillsboost.google/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-medium hover:underline inline-flex items-center"
                >
                  <span>Google Cloud Skills Boost</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>{' '}
                profile.
              </li>
              <li>Make sure profile visibility is set to <strong>Public</strong> in Settings.</li>
              <li>Copy your public profile URL (starts with <code>https://www.skills.google/public_profiles/unique_id</code>).</li>
              <li>Paste it into the tracker above and click <strong>"Check Progress"</strong>.</li>
            </ol>
          </div>

          <hr className="border-slate-100" />

          {/* Community Links */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Get in Touch & Community
            </h3>
            
            <div className="space-y-2">
              {/* WhatsApp Group */}
              <a
                href={CAMPAIGN_CONFIG.whatsappGroupUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-green-700 transition-colors">
                    Join WhatsApp Community Group
                  </p>
                  <p className="text-xs text-slate-500">
                    {CAMPAIGN_CONFIG.chapterName} • Doubt sessions & updates
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </a>

              {/* Referral Code Box */}
              <div className="flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <Ticket className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    Campaign Referral Code
                  </p>
                  <p className="text-xs text-slate-500">
                    Use when prompted in campaign forms
                  </p>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg tracking-wider shrink-0 border border-amber-200">
                  {CAMPAIGN_CONFIG.referralCode}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-400">
            Built by{' '}
            <a
              href={CAMPAIGN_CONFIG.credits.builtByUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-700 hover:text-[#4285F4] transition-colors cursor-pointer"
              title="View Sathappan T's LinkedIn"
            >
              {CAMPAIGN_CONFIG.credits.builtBy}
            </a>{' '}
            •{' '}
            <a
              href={CAMPAIGN_CONFIG.chapterUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-700 hover:text-[#4285F4] transition-colors cursor-pointer"
              title="Visit GDG on Campus CIT Website"
            >
              {CAMPAIGN_CONFIG.chapterName}
            </a>
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Got it!
          </button>
        </div>

      </div>
    </div>
  );
}
