import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Download, Users, Award, Gift, Sparkles, AlertCircle } from 'lucide-react';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function AdminModal({ onClose }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.stats) setStats(data.stats);
      })
      .catch(err => console.error('Error fetching admin stats:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDownloadCsv = () => {
    window.open('/api/admin/export', '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">Facilitator Dashboard</h3>
              <p className="text-slate-400 text-xs">
                {CAMPAIGN_CONFIG.chapterName} • {CAMPAIGN_CONFIG.collegeName}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Body */}
        <div className="p-6 space-y-5">
          
          {loading ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              Loading chapter metrics...
            </div>
          ) : stats ? (
            <>
              {/* Chapter Tier Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                    Current Chapter Status
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-0.5">
                    {stats.chapterTier}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Based on verified campaign completions at CIT
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  🏆
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span>Total Enrolled</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900 block mt-1">
                    {stats.totalParticipants}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Total Badges</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900 block mt-1">
                    {stats.totalBadgesEarned}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold">
                    <Gift className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Milestone 1 (Bottles)</span>
                  </div>
                  <span className="text-2xl font-black text-emerald-600 block mt-1">
                    {stats.milestone1Achieved}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold">
                    <Award className="w-3.5 h-3.5 text-blue-500" />
                    <span>Milestone 2 (T-Shirts)</span>
                  </div>
                  <span className="text-2xl font-black text-blue-600 block mt-1">
                    {stats.milestone2Achieved}
                  </span>
                </div>
              </div>

              {/* CSV Export Action */}
              <div className="pt-2">
                <button
                  onClick={handleDownloadCsv}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Roster Report (CSV)</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Includes student ranks, badge counts, milestone tags, and public profile links for official reporting.
                </p>
              </div>
            </>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 text-amber-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>No cohort statistics available yet.</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
