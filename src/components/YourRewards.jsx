import React from 'react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function YourRewards() {
  const { m1, m2 } = CAMPAIGN_CONFIG.milestones;

  return (
    <div id="your-rewards-section" className="bg-[#0f172a] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-800 text-white relative overflow-hidden shadow-2xl">
      
      {/* Background glow circle */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:w-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center space-x-3 mb-5 sm:mb-8 relative z-10">
        <div className="text-2xl sm:text-3xl">🎁</div>
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
            Your Rewards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Learn, earn Google Cloud badges and get rewarded at {CAMPAIGN_CONFIG.collegeName}!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10">
        
        {/* Reward 1 */}
        <div className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 relative overflow-hidden flex items-center justify-between shadow-xl gap-3">
          <div className="space-y-1.5 z-10 min-w-0">
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
              Milestone 1
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 pt-0.5 tracking-tight leading-tight">
              {m1.rewardName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {m1.rewardDescription}
            </p>
          </div>

          <div className="relative shrink-0 w-24 h-28 sm:w-32 sm:h-36 flex items-center justify-center">
            <div className="absolute inset-1 bg-[#e6f4ea] rounded-full scale-95" />
            <div className="absolute top-3 left-2 w-2.5 h-0.5 bg-emerald-500 rounded-full -rotate-45" />
            <div className="absolute bottom-5 right-1 w-2.5 h-0.5 bg-emerald-500 rounded-full rotate-45" />
            <img 
              src={m1.image} 
              alt={m1.rewardName} 
              className="relative z-10 w-16 h-24 sm:w-24 sm:h-32 object-contain drop-shadow-md" 
            />
          </div>
        </div>

        {/* Reward 2 */}
        <div className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 relative overflow-hidden flex items-center justify-between shadow-xl gap-3">
          <div className="space-y-1.5 z-10 min-w-0">
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
              Milestone 2
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 pt-0.5 tracking-tight leading-tight">
              {m2.rewardName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {m2.rewardDescription}
            </p>
          </div>

          <div className="relative shrink-0 w-24 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            <div className="absolute inset-1 bg-[#e8f0fe] rounded-full scale-95" />
            <div className="absolute top-3 right-3 w-2.5 h-0.5 bg-[#4285F4] rounded-full rotate-45" />
            <div className="absolute bottom-4 left-1 w-2.5 h-0.5 bg-[#4285F4] rounded-full -rotate-45" />
            <img 
              src={m2.image} 
              alt={m2.rewardName} 
              className="relative z-10 w-20 h-20 sm:w-28 sm:h-28 object-cover drop-shadow-md rounded-2xl" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
