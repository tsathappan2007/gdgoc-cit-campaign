import React, { useState, useEffect } from 'react';
import { Trophy, Search, User, RefreshCw, Crown, Sparkles, Flame, Zap, ShieldCheck } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function Leaderboard({ onSelectProfile, refreshTrigger }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      if (data.leaderboard) {
        setLeaderboard(data.leaderboard);
      }
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [refreshTrigger]);

  const filtered = leaderboard.filter(item => 
    item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.profileUrl && item.profileUrl.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const topThree = filtered.slice(0, 3);
  const remainingLearners = filtered.slice(3);

  return (
    <div id="leaderboard-section" className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 md:p-10 shadow-xs space-y-6">
      
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-800 text-[11px] font-black uppercase tracking-wider flex items-center space-x-1">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>Hall of Fame</span>
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Live Rankings</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {CAMPAIGN_CONFIG.chapterName} Leaderboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Top cloud champions at {CAMPAIGN_CONFIG.collegeName} in the Google Cloud Learn with Community Campaign.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
            />
          </div>

          <button
            onClick={() => fetchLeaderboard()}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Leaderboard Body */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm flex flex-col items-center justify-center space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          <span>Synchronizing campus rankings...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-14 px-4 text-center rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/50 border border-dashed border-slate-200 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner animate-float">
            <Trophy className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {searchQuery ? 'No Challengers Found' : 'Claim the #1 Rank!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {searchQuery 
                ? 'No participants matched your search query. Try another name.' 
                : 'The campus throne is empty! Paste your Skills Boost profile above to be the first learner on CIT\'s official leaderboard.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Top 3 Podium Showcase (if at least 1 participant) */}
          <div className={`grid grid-cols-1 ${topThree.length === 1 ? 'sm:grid-cols-1 max-w-sm mx-auto' : topThree.length === 2 ? 'sm:grid-cols-2 max-w-xl mx-auto' : 'sm:grid-cols-3'} gap-3.5 sm:gap-4 items-end pt-2`}>
            
            {/* Rank 2 (Left) */}
            {topThree[1] && (
              <div className="order-2 sm:order-1 bg-gradient-to-t from-slate-100 via-slate-50 to-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-2 transform-gpu hover:-translate-y-1 transition-transform">
                <div className="relative">
                  {topThree[1].avatarUrl ? (
                    <img
                      src={topThree[1].avatarUrl}
                      alt={topThree[1].userName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-300 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center shadow-md font-bold">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <span className="absolute -bottom-2 -right-1 text-lg">🥈</span>
                </div>

                <div className="min-w-0 w-full">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rank #2</span>
                  <h4 className="font-black text-slate-900 text-sm truncate">{topThree[1].userName}</h4>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-slate-200/70 text-slate-800 text-xs font-black">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{topThree[1].completedCount} Badges • {topThree[1].completedCount * 100} XP</span>
                </div>
              </div>
            )}

            {/* Rank 1 (Center - Elevated) */}
            {topThree[0] && (
              <div className="order-1 sm:order-2 bg-gradient-to-t from-amber-50 via-white to-amber-50/40 rounded-3xl p-6 border-2 border-amber-300 ring-2 ring-amber-400/30 shadow-lg flex flex-col items-center text-center space-y-2.5 transform-gpu hover:-translate-y-1 transition-transform relative">
                <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow-xs">
                  <Crown className="w-3 h-3 text-amber-200" />
                  <span>Grand Champion</span>
                </div>

                <div className="relative mt-1">
                  {topThree[0].avatarUrl ? (
                    <img
                      src={topThree[0].avatarUrl}
                      alt={topThree[0].userName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md ring-2 ring-amber-300/40"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-md font-bold">
                      <User className="w-7 h-7" />
                    </div>
                  )}
                  <span className="absolute -bottom-2 -right-1 text-2xl">🥇</span>
                </div>

                <div className="min-w-0 w-full">
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block">Rank #1 Leader</span>
                  <h4 className="font-black text-slate-900 text-base truncate">{topThree[0].userName}</h4>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-xl bg-amber-400/30 text-amber-900 text-xs font-black shadow-2xs">
                  <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>{topThree[0].completedCount} Badges • {topThree[0].completedCount * 100} XP</span>
                </div>
              </div>
            )}

            {/* Rank 3 (Right) */}
            {topThree[2] && (
              <div className="order-3 bg-gradient-to-t from-amber-950/5 via-slate-50 to-white rounded-3xl p-5 border border-amber-200/80 shadow-xs flex flex-col items-center text-center space-y-2 transform-gpu hover:-translate-y-1 transition-transform">
                <div className="relative">
                  {topThree[2].avatarUrl ? (
                    <img
                      src={topThree[2].avatarUrl}
                      alt={topThree[2].userName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-700/40 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-md font-bold">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <span className="absolute -bottom-2 -right-1 text-lg">🥉</span>
                </div>

                <div className="min-w-0 w-full">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rank #3</span>
                  <h4 className="font-black text-slate-900 text-sm truncate">{topThree[2].userName}</h4>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-black">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>{topThree[2].completedCount} Badges • {topThree[2].completedCount * 100} XP</span>
                </div>
              </div>
            )}

          </div>

          {/* Full Ranked Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider bg-slate-50/60">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Challenger</th>
                  <th className="py-3 px-4 text-center">XP & Badges</th>
                  <th className="py-3 px-4 text-right">Milestones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
                {filtered.map((item, idx) => {
                  const isTop1 = item.rank === 1;
                  const isTop2 = item.rank === 2;
                  const isTop3 = item.rank === 3;

                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Rank */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {isTop1 ? (
                          <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs">
                            🥇
                          </span>
                        ) : isTop2 ? (
                          <span className="w-7 h-7 rounded-xl bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs shadow-xs">
                            🥈
                          </span>
                        ) : isTop3 ? (
                          <span className="w-7 h-7 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                            🥉
                          </span>
                        ) : (
                          <span className="font-mono font-black text-slate-400 px-1 text-xs">
                            #{item.rank}
                          </span>
                        )}
                      </td>

                      {/* Participant Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2.5">
                          {item.avatarUrl ? (
                            <img
                              src={item.avatarUrl}
                              alt={item.userName}
                              className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0"
                              onError={(e) => {
                                e.currentTarget.src = "https://www.gstatic.com/devrel-devsite/prod/v52a23e9cb3de7a61d6fb1e6a17b6a6bbfe3e04e84cbef70139b854378f85f54d/cloud/images/favicons/onecloud/super_g.png";
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="font-black text-slate-900 block truncate">
                              {item.userName}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate block font-medium">
                              {CAMPAIGN_CONFIG.collegeName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* XP & Badges */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="font-black text-slate-900 px-2.5 py-1 rounded-xl bg-slate-100 inline-flex items-center space-x-1">
                          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{item.completedCount * 100} XP ({item.completedCount}/{item.totalRequired})</span>
                        </span>
                      </td>

                      {/* Milestones */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {item.milestone2 ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs">
                            Champion 🏆
                          </span>
                        ) : item.milestone1 ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Milestone 1 ✅
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500">
                            In Progress
                          </span>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
