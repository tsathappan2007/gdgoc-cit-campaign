import React, { useState } from 'react';
import { CheckCircle2, Gift, ArrowRight, X, Sparkles } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function Milestones({ completedCount = 0 }) {
  const isM1 = completedCount >= 5;
  const isM2 = completedCount >= 10;
  const [previewReward, setPreviewReward] = useState(null);

  const openReward = (reward, milestoneLevel) => {
    setPreviewReward({
      ...reward,
      level: milestoneLevel,
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Milestones
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete the required skill badges to unlock amazing Google goodies!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Milestone 1 Card */}
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border transition-all flex flex-col justify-between ${
          isM1 
            ? 'bg-[#f4fbf7] border-emerald-200 ring-1 ring-emerald-400/20' 
            : 'bg-white border-slate-200/90'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center space-x-2.5">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isM1 ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isM1 ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : '1'}
                </div>
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Milestone 1
                </span>
              </div>

              {isM1 ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Achieved ✅
                </span>
              ) : completedCount > 0 ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  In Progress
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
                  Locked
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Complete 5 Skill Badges
            </h3>

            <div className="mt-3 flex items-center space-x-3">
              <div className="flex-1 bg-slate-100 h-2 sm:h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700 bg-emerald-500" 
                  style={{ width: `${Math.min(100, (completedCount / 5) * 100)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-600 shrink-0">
                {Math.min(5, completedCount)} / 5
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="space-y-1 min-w-0">
              <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700">
                <Gift className="w-3.5 h-3.5" />
                <span>Reward</span>
              </div>
              <p className="font-extrabold text-slate-900 text-sm sm:text-base">
                {CAMPAIGN_CONFIG.milestones.m1.rewardName}
              </p>
              <button 
                type="button" 
                onClick={() => openReward(CAMPAIGN_CONFIG.milestones.m1, 1)} 
                className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline pt-1 cursor-pointer transition-colors"
              >
                <span>View Reward</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => openReward(CAMPAIGN_CONFIG.milestones.m1, 1)}
              className="relative shrink-0 flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 group cursor-pointer focus:outline-none"
              title="Click to view reward image"
            >
              <div className="absolute inset-1 sm:inset-2 bg-emerald-100 rounded-full group-hover:scale-105 transition-transform" />
              <img 
                src={CAMPAIGN_CONFIG.milestones.m1.image} 
                alt={CAMPAIGN_CONFIG.milestones.m1.rewardName} 
                className="relative z-10 w-14 h-18 sm:w-20 sm:h-24 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>

        {/* Milestone 2 Card */}
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border transition-all flex flex-col justify-between ${
          isM2 
            ? 'bg-[#f4f7fc] border-blue-200 ring-1 ring-blue-400/20' 
            : 'bg-white border-slate-200/90'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center space-x-2.5">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isM2 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                }`}>
                  {isM2 ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : '2'}
                </div>
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Milestone 2
                </span>
              </div>

              {isM2 ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                  Achieved 🏆
                </span>
              ) : isM1 ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  In Progress
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
                  Locked
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Complete 10 Skill Badges
            </h3>

            <div className="mt-3 flex items-center space-x-3">
              <div className="flex-1 bg-slate-100 h-2 sm:h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700 bg-[#1a73e8]" 
                  style={{ width: `${Math.min(100, (completedCount / 10) * 100)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-600 shrink-0">
                {completedCount} / 10
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="space-y-1 min-w-0">
              <div className="inline-flex items-center space-x-1 text-xs font-bold text-[#1a73e8]">
                <Gift className="w-3.5 h-3.5" />
                <span>Reward</span>
              </div>
              <p className="font-extrabold text-slate-900 text-sm sm:text-base">
                {CAMPAIGN_CONFIG.milestones.m2.rewardName}
              </p>
              <p className="text-xs text-slate-400">
                Unlock the ultimate Google swag!
              </p>
              <button 
                type="button" 
                onClick={() => openReward(CAMPAIGN_CONFIG.milestones.m2, 2)} 
                className="inline-flex items-center text-xs font-bold text-[#1a73e8] hover:text-blue-700 hover:underline pt-1 cursor-pointer transition-colors"
              >
                <span>View Reward</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => openReward(CAMPAIGN_CONFIG.milestones.m2, 2)}
              className="relative shrink-0 flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 group cursor-pointer focus:outline-none"
              title="Click to view reward image"
            >
              <div className="absolute inset-1 sm:inset-1 bg-blue-100 rounded-full group-hover:scale-105 transition-transform" />
              <img 
                src={CAMPAIGN_CONFIG.milestones.m2.image} 
                alt={CAMPAIGN_CONFIG.milestones.m2.rewardName} 
                className="relative z-10 w-16 h-16 sm:w-24 sm:h-24 object-cover drop-shadow-sm rounded-xl group-hover:scale-110 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>

      </div>

      {/* Reward Image Modal / Lightbox */}
      {previewReward && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setPreviewReward(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200/80 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-black tracking-wide ${
                  previewReward.level === 1 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  Milestone {previewReward.level} Reward
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {previewReward.requiredCount} Badges Required
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewReward(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Showcase */}
            <div className="p-4 sm:p-6 bg-slate-50 flex items-center justify-center">
              <div className="relative w-full max-h-80 sm:max-h-96 flex items-center justify-center rounded-2xl bg-white p-4 shadow-xs border border-slate-200/60 overflow-hidden">
                <img
                  src={previewReward.image}
                  alt={previewReward.rewardName}
                  className="max-h-72 sm:max-h-88 w-auto object-contain rounded-xl drop-shadow-md"
                />
              </div>
            </div>

            {/* Modal Info Footer */}
            <div className="p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    {previewReward.rewardName}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {previewReward.level === 1 
                      ? 'Official Google insulated steel bottle awarded upon reaching Milestone 1 (5 badges).' 
                      : 'Exclusive Google Developer Groups T-Shirt & curated goodies box awarded upon completing Milestone 2 (all 10 badges).'}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setPreviewReward(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  Awesome, got it!
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
