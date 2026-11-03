import React from 'react';
import { CheckCircle2, Gift, ArrowRight } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function Milestones({ completedCount = 0 }) {
  const isM1 = completedCount >= 5;
  const isM2 = completedCount >= 10;

  const scrollToRewards = () => {
    const el = document.getElementById('your-rewards-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
                onClick={scrollToRewards} 
                className="inline-flex items-center text-xs font-bold text-emerald-700 hover:underline pt-1 cursor-pointer"
              >
                <span>View Reward</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <div className="relative shrink-0 flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28">
              <div className="absolute inset-1 sm:inset-2 bg-emerald-100 rounded-full" />
              <img 
                src={CAMPAIGN_CONFIG.milestones.m1.image} 
                alt={CAMPAIGN_CONFIG.milestones.m1.rewardName} 
                className="relative z-10 w-14 h-18 sm:w-20 sm:h-24 object-contain drop-shadow-sm" 
              />
            </div>
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
                onClick={scrollToRewards} 
                className="inline-flex items-center text-xs font-bold text-[#1a73e8] hover:underline pt-1 cursor-pointer"
              >
                <span>View Reward</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <div className="relative shrink-0 flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28">
              <div className="absolute inset-1 sm:inset-1 bg-blue-100 rounded-full" />
              <img 
                src={CAMPAIGN_CONFIG.milestones.m2.image} 
                alt={CAMPAIGN_CONFIG.milestones.m2.rewardName} 
                className="relative z-10 w-16 h-16 sm:w-24 sm:h-24 object-cover drop-shadow-sm rounded-xl" 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
