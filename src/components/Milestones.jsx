import React, { useState } from 'react';
import { CheckCircle2, Gift, ArrowRight, X, Sparkles, Trophy, Lock, Compass, Eye, ShieldAlert } from 'lucide-react';
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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-800 text-[11px] font-black uppercase tracking-wider">
              Quest Roadmap
            </span>
            <span className="text-xs text-slate-400 font-semibold">• 2 Major Milestones</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Swag & Milestone Quests
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Conquer skill badges to level up and unlock official Google merchandise!
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Quests: {completedCount >= 10 ? 'All Completed! 🎉' : completedCount >= 5 ? 'Final Quest Active 🚀' : 'Quest 1 Active 🎯'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Quest 1 Card: Swag Hunter */}
        <div className={`rounded-3xl p-5 sm:p-7 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden transform-gpu hover:-translate-y-1 ${
          isM1 
            ? 'bg-gradient-to-br from-[#f2fbf6] via-white to-[#e8f7ee] border-emerald-300 ring-2 ring-emerald-400/40 shadow-xl shadow-emerald-500/10' 
            : 'bg-white border-slate-200/90 shadow-sm hover:border-slate-300'
        }`}>
          {/* Subtle Corner Hologram Badge */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100/80">
              <div className="flex items-center space-x-2.5">
                <div className={`w-8 h-8 rounded-2xl flex items-center justify-center font-black text-sm shadow-xs ${
                  isM1 ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isM1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                    Quest 01
                  </span>
                  <span className="font-black text-slate-900 text-base">
                    Swag Hunter
                  </span>
                </div>
              </div>

              {isM1 ? (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white shadow-xs flex items-center space-x-1 animate-in zoom-in-95">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>UNLOCKED ✅</span>
                </span>
              ) : completedCount > 0 ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {5 - completedCount} badges to go
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-400 flex items-center space-x-1">
                  <Lock className="w-3 h-3 mr-0.5" />
                  <span>Locked</span>
                </span>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Complete 5 Skill Badges
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Reach the halfway checkpoint to claim your first physical Google prize.
              </p>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Quest Progress</span>
                <span className="text-emerald-700 font-black">{Math.min(5, completedCount)} / 5</span>
              </div>
              <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-emerald-500 to-teal-400" 
                  style={{ width: `${Math.min(100, (completedCount / 5) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="space-y-1 min-w-0">
              <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700">
                <Gift className="w-3.5 h-3.5" />
                <span>Unlocked Loot</span>
              </div>
              <p className="font-black text-slate-900 text-sm sm:text-base truncate">
                {CAMPAIGN_CONFIG.milestones.m1.rewardName}
              </p>
              <button 
                type="button" 
                onClick={() => openReward(CAMPAIGN_CONFIG.milestones.m1, 1)} 
                className="inline-flex items-center text-xs font-black text-emerald-700 hover:text-emerald-800 hover:underline pt-1 cursor-pointer transition-colors"
              >
                <Eye className="w-3.5 h-3.5 mr-1" />
                <span>Inspect Loot</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => openReward(CAMPAIGN_CONFIG.milestones.m1, 1)}
              className="relative shrink-0 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 group cursor-pointer focus:outline-none"
              title="Click to inspect reward"
            >
              <div className="absolute inset-1 bg-emerald-100 rounded-2xl group-hover:scale-105 transition-transform" />
              <img 
                src={CAMPAIGN_CONFIG.milestones.m1.image} 
                alt={CAMPAIGN_CONFIG.milestones.m1.rewardName} 
                className="relative z-10 w-14 h-18 sm:w-16 sm:h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>

        {/* Quest 2 Card: Cloud Legend */}
        <div className={`rounded-3xl p-5 sm:p-7 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden transform-gpu hover:-translate-y-1 ${
          isM2 
            ? 'bg-gradient-to-br from-[#eff5ff] via-white to-[#f5f0ff] border-blue-400 ring-2 ring-blue-500 animate-pulse-glow shadow-xl shadow-blue-500/20' 
            : 'bg-white border-slate-200/90 shadow-sm hover:border-slate-300'
        }`}>
          {/* Subtle Corner Hologram Badge */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100/80">
              <div className="flex items-center space-x-2.5">
                <div className={`w-8 h-8 rounded-2xl flex items-center justify-center font-black text-sm shadow-xs ${
                  isM2 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-blue-100 text-blue-800'
                }`}>
                  {isM2 ? <Trophy className="w-5 h-5" /> : '2'}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
                    Final Boss Quest
                  </span>
                  <span className="font-black text-slate-900 text-base">
                    Cloud Legend
                  </span>
                </div>
              </div>

              {isM2 ? (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md flex items-center space-x-1 animate-in zoom-in-95">
                  <Trophy className="w-3.5 h-3.5 text-amber-200" />
                  <span>MASTERED 🏆</span>
                </span>
              ) : isM1 ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {10 - completedCount} badges to victory
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-400 flex items-center space-x-1">
                  <Lock className="w-3 h-3 mr-0.5" />
                  <span>Locked</span>
                </span>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Complete 10 Skill Badges
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Unlock the ultimate Google swag: Official GDG T-Shirt + Goodies Box!
              </p>
            </div>

            <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Final Quest Progress</span>
                <span className="text-blue-700 font-black">{completedCount} / 10</span>
              </div>
              <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" 
                  style={{ width: `${Math.min(100, (completedCount / 10) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="space-y-1 min-w-0">
              <div className="inline-flex items-center space-x-1 text-xs font-bold text-blue-700">
                <Gift className="w-3.5 h-3.5" />
                <span>Mythic Swag Box</span>
              </div>
              <p className="font-black text-slate-900 text-sm sm:text-base truncate">
                {CAMPAIGN_CONFIG.milestones.m2.rewardName}
              </p>
              <button 
                type="button" 
                onClick={() => openReward(CAMPAIGN_CONFIG.milestones.m2, 2)} 
                className="inline-flex items-center text-xs font-black text-blue-700 hover:text-blue-800 hover:underline pt-1 cursor-pointer transition-colors"
              >
                <Eye className="w-3.5 h-3.5 mr-1" />
                <span>Inspect Loot</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => openReward(CAMPAIGN_CONFIG.milestones.m2, 2)}
              className="relative shrink-0 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 group cursor-pointer focus:outline-none"
              title="Click to inspect reward"
            >
              <div className="absolute inset-1 bg-blue-100 rounded-2xl group-hover:scale-105 transition-transform" />
              <img 
                src={CAMPAIGN_CONFIG.milestones.m2.image} 
                alt={CAMPAIGN_CONFIG.milestones.m2.rewardName} 
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 object-cover drop-shadow-md rounded-xl group-hover:scale-110 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>

      </div>

      {/* Gamified Reward Loot Modal */}
      {previewReward && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewReward(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/60 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide flex items-center space-x-1 ${
                  previewReward.level === 1 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                  <Trophy className="w-3 h-3" />
                  <span>Milestone {previewReward.level} Loot</span>
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {previewReward.requiredCount} Badges Required
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewReward(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Showcase */}
            <div className="p-5 sm:p-7 bg-radial from-slate-100 to-slate-200/50 flex items-center justify-center">
              <div className="relative w-full max-h-80 sm:max-h-96 flex items-center justify-center rounded-2xl bg-white p-5 shadow-lg border border-slate-200/60 overflow-hidden group">
                <img
                  src={previewReward.image}
                  alt={previewReward.rewardName}
                  className="max-h-72 sm:max-h-84 w-auto object-contain rounded-xl drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Modal Info Footer */}
            <div className="p-5 sm:p-6 space-y-3">
              <div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">
                  {previewReward.rewardName}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {previewReward.level === 1 
                    ? 'Official Google insulated steel bottle awarded to participants upon earning 5 verified curriculum skill badges at Chennai Institute of Technology.' 
                    : 'Exclusive Google Developer Groups T-Shirt & curated goodies box awarded to learners who complete all 10 verified skill badges!'}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setPreviewReward(null)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all transform-gpu hover:scale-102 cursor-pointer"
                >
                  Got It!
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
