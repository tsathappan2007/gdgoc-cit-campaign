import React, { useState, useEffect } from 'react';
import { Trophy, Search, Medal, User, Award, ExternalLink, RefreshCw } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function Leaderboard({ onSelectProfile }) {
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
  }, []);

  const filtered = leaderboard.filter(item => 
    item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.profileUrl && item.profileUrl.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div id="leaderboard-section" className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-7 md:p-10 shadow-xs space-y-5">
      
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {CAMPAIGN_CONFIG.chapterName} Leaderboard
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Top performers in the Google Cloud Learn with Community Campaign at {CAMPAIGN_CONFIG.collegeName}
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
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
            />
          </div>

          <button
            onClick={fetchLeaderboard}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm">
          Loading campus rankings...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-sm">
          {searchQuery ? 'No participants matched your search.' : 'No participants on the leaderboard yet. Be the first to check your profile!'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-3">Participant</th>
                <th className="py-3 px-3 text-center">Badges</th>
                <th className="py-3 px-3 text-center">Milestones</th>
                <th className="py-3 px-3 text-right">Action</th>
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
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {isTop1 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs">
                          🥇
                        </span>
                      ) : isTop2 ? (
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-xs shadow-xs">
                          🥈
                        </span>
                      ) : isTop3 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                          🥉
                        </span>
                      ) : (
                        <span className="font-bold text-slate-400 px-1">
                          #{item.rank}
                        </span>
                      )}
                    </td>

                    {/* Participant Name & Avatar */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-2.5">
                        {item.avatarUrl ? (
                          <img
                            src={item.avatarUrl}
                            alt={item.userName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = "https://www.gstatic.com/devrel-devsite/prod/v52a23e9cb3de7a61d6fb1e6a17b6a6bbfe3e04e84cbef70139b854378f85f54d/cloud/images/favicons/onecloud/super_g.png";
                            }}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block truncate">
                            {item.userName}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block">
                            {CAMPAIGN_CONFIG.collegeName}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Badges Count */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span className="font-black text-slate-900 px-2 py-0.5 rounded-lg bg-slate-100">
                        {item.completedCount} / {item.totalRequired}
                      </span>
                    </td>

                    {/* Milestones */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      {item.milestone2 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Champion 🏆
                        </span>
                      ) : item.milestone1 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Milestone 1 ✅
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500">
                          In Progress
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      {item.profileUrl && (
                        <button
                          onClick={() => onSelectProfile(item.profileUrl)}
                          className="inline-flex items-center text-xs font-semibold text-[#1a73e8] hover:underline cursor-pointer"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
