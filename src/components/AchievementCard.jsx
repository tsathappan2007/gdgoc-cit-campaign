import React, { useState } from 'react';
import { X, Award, CheckCircle2, Copy, Check, Share2 } from 'lucide-react';
import { GDGLogo } from './Navbar';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function AchievementCard({ profileData, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!profileData) return null;

  const { userName, completedCount, milestone1, milestone2 } = profileData;
  const isChampion = milestone2?.isCompleted;
  const isM1 = milestone1?.isCompleted;

  const shareText = `🎉 Excited to share that I have completed ${completedCount} Google Cloud Skill Badges in the ${CAMPAIGN_CONFIG.shortProgramName} campaign with ${CAMPAIGN_CONFIG.chapterName} at ${CAMPAIGN_CONFIG.collegeName}! 🚀☁️ #GoogleCloud #GDGoC #GDGCIT #ChennaiInstituteOfTechnology`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Your Achievement Pass</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Graphic Card Container */}
        <div className="p-6">
          <div id="achievement-pass" className="rounded-2xl p-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white border border-slate-700 shadow-xl relative overflow-hidden space-y-4">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center space-x-2">
                <GDGLogo className="w-5 h-5" />
                <span className="font-black text-xs tracking-wider text-slate-200 uppercase">
                  {CAMPAIGN_CONFIG.chapterName}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Official Learner
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Google Cloud Campaign</span>
              <h4 className="text-xl font-black text-white leading-tight">
                {userName}
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                {CAMPAIGN_CONFIG.collegeName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Badges Earned</span>
                <span className="text-xl font-black text-amber-400">
                  {completedCount} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Milestone Tier</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center mt-1">
                  {isChampion ? 'Champion 🏆' : isM1 ? 'Milestone 1 ✅' : 'In Progress 🚀'}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Google Cloud Learn with Community Campaign</span>
              <span>CIT Chapter</span>
            </div>
          </div>
        </div>

        {/* Copy text action */}
        <div className="px-6 pb-6 space-y-2">
          <button
            onClick={handleCopyText}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1a73e8] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Post Text for LinkedIn / WhatsApp</span>
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-slate-400">
            Take a screenshot of the pass above to share with your post!
          </p>
        </div>

      </div>
    </div>
  );
}
