import React, { useState } from 'react';
import { CheckCircle2, Clock, Sparkles, ExternalLink } from 'lucide-react';
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
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-7 md:p-10 shadow-xs">
      
      {/* Header and Filter Controls */}
      <div className="flex flex-col gap-3 pb-4 sm:pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Official 10 Skill Badges
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-200">
                {completedCount} / {checklist.length} Done
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Required curriculum for {CAMPAIGN_CONFIG.shortProgramName} • {CAMPAIGN_CONFIG.chapterName}
            </p>
          </div>

          <div className="inline-flex rounded-xl sm:rounded-2xl bg-slate-100 p-1 text-xs font-bold self-start">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All ({checklist.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'completed'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Done ({completedCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'pending'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Left ({pendingCount})
            </button>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filteredBadges.map((badge, idx) => (
          <div
            key={badge.id || idx}
            className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all ${
              badge.isCompleted
                ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                : 'bg-white border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              
              {/* Badge Number / Checkmark icon */}
              <div className="mt-0.5 shrink-0">
                {badge.isCompleted ? (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center border border-slate-200">
                    #{badge.id}
                  </div>
                )}
              </div>

              {/* Title & Metadata */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600" style={{ fontSize: '10px' }}>
                    {badge.category || 'Skill Badge'}
                  </span>
                  
                  <span
                    className={`font-extrabold px-2 py-0.5 rounded-full border ${
                      badge.credits === 0
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                    style={{ fontSize: '10px' }}
                  >
                    {badge.credits === 0 ? '0 Credits (Free)' : `${badge.credits} Credits`}
                  </span>

                  {badge.isCompleted && (
                    <span className="font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800" style={{ fontSize: '10px' }}>
                      Earned ✅
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                  {badge.requiredTitle}
                </h4>
              </div>

            </div>

            {/* Footer with status or start link */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              {badge.isCompleted ? (
                <div className="flex items-center text-emerald-700 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  <span>{badge.earnedDate ? badge.earnedDate : 'Earned on profile'}</span>
                </div>
              ) : (
                <div className="flex items-center text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  <span>Not completed yet</span>
                </div>
              )}

              {badge.courseUrl && (
                <a
                  href={badge.courseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center font-bold shrink-0 ml-2 ${
                    badge.isCompleted
                      ? 'text-slate-400 hover:text-slate-600'
                      : 'text-[#1a73e8] hover:underline'
                  }`}
                >
                  <span>{badge.isCompleted ? 'Review' : 'Start'}</span>
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
