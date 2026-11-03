import React, { useState } from 'react';
import { CheckCircle2, Clock, Sparkles, ExternalLink, Zap, Lock, Compass, Award } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function BadgesChecklist({ checklist = [] }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'completed' | 'pending'

  if (!checklist || checklist.length === 0) return null;

  const completedCount = checklist.filter(b => b.isCompleted).length;
  const pendingCount = checklist.length - completedCount;

  const filteredBadges = checklist.filter(b => {
    if (filter === 'completed') return b.isCompleted;
    if (filter === 'pending') return !b.isCompleted;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 md:p-10 shadow-xs space-y-5">
      
      {/* Header and Filter Controls */}
      <div className="flex flex-col gap-3 pb-5 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 text-[11px] font-black uppercase tracking-wider">
                Skill Inventory
              </span>
              <span className="text-xs text-slate-400 font-semibold">• 10 Google Cloud Badges</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Curriculum Badge Vault
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Each completed skill badge grants 100 XP towards your Google Cloud swag tiers.
            </p>
          </div>

          <div className="inline-flex rounded-2xl bg-slate-100 p-1 text-xs font-bold self-start sm:self-center shadow-inner">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm font-black'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All (10)
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                filter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-sm font-black'
                  : 'text-slate-500 hover:text-emerald-700'
              }`}
            >
              Claimed ({completedCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                filter === 'pending'
                  ? 'bg-amber-600 text-white shadow-sm font-black'
                  : 'text-slate-500 hover:text-amber-700'
              }`}
            >
              Available ({pendingCount})
            </button>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {filteredBadges.map((badge, idx) => (
          <div
            key={badge.id || idx}
            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between transform-gpu hover:-translate-y-0.5 ${
              badge.isCompleted
                ? 'bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/30 border-emerald-200/90 hover:border-emerald-300 ring-1 ring-emerald-400/20 shadow-xs'
                : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-start space-x-3">
                
                {/* Badge Number / Checkmark icon */}
                <div className="mt-0.5 shrink-0">
                  {badge.isCompleted ? (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 font-black text-xs flex items-center justify-center border border-slate-200">
                      #{badge.id}
                    </div>
                  )}
                </div>

                {/* Title & Metadata */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {badge.category || 'Skill Badge'}
                    </span>
                    
                    <span
                      className={`font-black px-2 py-0.5 rounded-md border text-[10px] ${
                        badge.credits === 0
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {badge.credits === 0 ? '0 Credits (Free)' : `${badge.credits} Credits`}
                    </span>

                    {badge.isCompleted && (
                      <span className="font-black px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>CLAIMED +100 XP</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-black text-slate-900 text-xs sm:text-sm leading-snug">
                    {badge.requiredTitle}
                  </h4>
                </div>

              </div>
            </div>

            {/* Footer with status or start link */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              {badge.isCompleted ? (
                <div className="flex items-center text-emerald-700 font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  <span>Verified: {badge.earnedDate ? badge.earnedDate : 'Earned on profile'}</span>
                </div>
              ) : (
                <div className="flex items-center text-slate-400 font-medium text-[11px]">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  <span>Quest available</span>
                </div>
              )}

              {badge.courseUrl && (
                <a
                  href={badge.courseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center font-bold text-xs shrink-0 ml-2 py-1 px-2 rounded-lg transition-colors ${
                    badge.isCompleted
                      ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <span>{badge.isCompleted ? 'Review' : 'Begin Quest'}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
