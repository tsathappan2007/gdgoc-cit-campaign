import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  Download, 
  RefreshCw, 
  Search, 
  Users, 
  Sparkles, 
  Gift, 
  Award, 
  ExternalLink, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Trash2 
} from 'lucide-react';
import { GDGLogo, GoogleLogo } from '../components/Navbar';
import { CAMPAIGN_CONFIG } from '../config/campaign';

export function AdminPage({ onNavigateHome }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('cit_admin_token'));
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dashboard state
  const [stats, setStats] = useState(null);
  const [roster, setRoster] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'm2' | 'm1' | 'pending'
  const [refreshing, setRefreshing] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      sessionStorage.setItem('cit_admin_token', data.token);
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cit_admin_token');
    setToken(null);
    setPin('');
  };

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [statsRes, rosterRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/admin/roster')
      ]);

      const statsData = await statsRes.json();
      const rosterData = await rosterRes.json();

      if (statsData.stats) setStats(statsData.stats);
      if (rosterData.roster) setRoster(rosterData.roster);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleDownloadCsv = () => {
    window.open('/api/admin/export', '_blank');
  };

  const [showClearModal, setShowClearModal] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [clearMessage, setClearMessage] = useState(null);

  const confirmClearLeaderboard = async () => {
    setClearing(true);
    try {
      const res = await fetch('/api/admin/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        await fetchData();
        setShowClearModal(false);
        setClearMessage('Leaderboard has been successfully cleared! All entries and metrics have been reset to 0.');
        setTimeout(() => setClearMessage(null), 5000);
      }
    } catch (err) {
      console.error('Failed to clear leaderboard:', err);
      alert('Failed to clear leaderboard');
    } finally {
      setClearing(false);
    }
  };

  // Filter roster
  const filteredRoster = roster.filter(student => {
    const matchesSearch = student.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (student.profileUrl && student.profileUrl.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (filter === 'm2') return student.milestone2;
    if (filter === 'm1') return student.milestone1 && !student.milestone2;
    if (filter === 'pending') return !student.milestone1;
    return true;
  });

  // 1. LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-4 sm:p-6 font-sans">
        
        {/* Top Navbar */}
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Learner Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <GDGLogo className="w-5 h-5" />
            <span className="text-xs font-bold text-slate-300">
              {CAMPAIGN_CONFIG.chapterName}
            </span>
          </div>
        </div>

        {/* Center Login Card */}
        <div className="max-w-md w-full mx-auto my-12 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Facilitator Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Sign in with your chapter PIN to view participant records, chapter metrics, and export official reports.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Facilitator PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm tracking-wider"
                required
                autoFocus
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !pin.trim()}
              className="w-full py-3 bg-[#1a73e8] hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-lg shadow-blue-500/10"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-700/60 text-center">
            <p className="text-[11px] text-slate-400">
              {CAMPAIGN_CONFIG.collegeName} • GDG on Campus
            </p>
          </div>

        </div>

        <div className="text-center text-xs text-slate-500">
          Google Cloud Learn with Community Campaign
        </div>

      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      
      {/* Admin Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateHome}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer mr-1"
              title="Return to Learner Portal"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <GDGLogo className="w-6 h-6" />
            <div>
              <h1 className="font-bold text-sm sm:text-base leading-tight">
                Facilitator Admin Portal
              </h1>
              <p className="text-xs text-slate-400">
                {CAMPAIGN_CONFIG.chapterName} • {CAMPAIGN_CONFIG.collegeName}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onNavigateHome}
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Learner Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-red-200 border border-red-800 text-xs font-semibold transition-colors cursor-pointer"
              title="Sign out of admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Top Overview & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Campaign Roster & Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Live monitoring of verified Google Cloud skill badges and reward eligibility.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={fetchData}
              disabled={refreshing}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              title="Refresh Roster"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleDownloadCsv}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Roster (CSV)</span>
            </button>

            <button
              onClick={() => setShowClearModal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
              title="Clear all participant data and reset leaderboard"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Leaderboard</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {clearMessage && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-2xl flex items-center space-x-2 text-sm font-semibold shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{clearMessage}</span>
          </div>
        )}

        {/* 4 Analytics Tiles + Chapter Status */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Enrolled Learners</span>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-3xl font-black text-slate-900 block">
                {stats.totalParticipants}
              </span>
              <p className="text-[11px] text-slate-400">Total verified on this tracker</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Total Badges</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-3xl font-black text-slate-900 block">
                {stats.totalBadgesEarned}
              </span>
              <p className="text-[11px] text-slate-400">Across all students at CIT</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Milestone 1</span>
                <Gift className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-3xl font-black text-emerald-600 block">
                {stats.milestone1Achieved}
              </span>
              <p className="text-[11px] text-slate-400">Google Water Bottle eligible (5+ badges)</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Milestone 2</span>
                <Award className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-3xl font-black text-blue-600 block">
                {stats.milestone2Achieved}
              </span>
              <p className="text-[11px] text-slate-400">T-Shirt & Box eligible (10 badges)</p>
            </div>

          </div>
        )}

        {/* Roster Data Table Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Filter & Search Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({roster.length})
              </button>
              <button
                onClick={() => setFilter('m2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'm2' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                Milestone 2 ({roster.filter(s => s.milestone2).length})
              </button>
              <button
                onClick={() => setFilter('m1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'm1' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Milestone 1 ({roster.filter(s => s.milestone1 && !s.milestone2).length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'pending' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                In Progress ({roster.filter(s => !s.milestone1).length})
              </button>
            </div>

            <div className="relative sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search participant or URL..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

          </div>

          {/* Table */}
          {filteredRoster.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              No participants found matching the current filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Participant Name</th>
                    <th className="py-3 px-4 text-center">Badges Done</th>
                    <th className="py-3 px-4 text-center">Percentage</th>
                    <th className="py-3 px-4 text-center">Milestone 1</th>
                    <th className="py-3 px-4 text-center">Milestone 2</th>
                    <th className="py-3 px-4">Profile URL</th>
                    <th className="py-3 px-4 text-right">Last Verified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {filteredRoster.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-400 whitespace-nowrap">
                        {idx + 1}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">
                          {item.userName}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="font-extrabold text-slate-900 px-2 py-0.5 rounded-lg bg-slate-100">
                          {item.completedCount} / 10
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="font-bold text-blue-600">
                          {item.percentage}%
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {item.milestone1 ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Eligible ✅
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-400">
                            Locked
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {item.milestone2 ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                            Eligible 🏆
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-400">
                            Locked
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 max-w-xs truncate">
                        <a
                          href={item.profileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#1a73e8] hover:underline font-mono text-xs inline-flex items-center space-x-1"
                        >
                          <span className="truncate">{item.profileUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>

                      <td className="py-3 px-4 text-right text-slate-400 text-xs whitespace-nowrap">
                        {item.lastChecked ? new Date(item.lastChecked).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* Danger Zone: Clear Leaderboard Section */}
        <div className="bg-red-50/70 border border-red-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-red-700 font-extrabold text-sm sm:text-base">
              <Trash2 className="w-5 h-5 text-red-600" />
              <span>Danger Zone: Clear Campus Leaderboard</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Permanently wipe all participant entries and badge progress. This will return the leaderboard and chapter metrics back to 0. Use this whenever you want to reset and start fresh.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowClearModal(true)}
            className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Leaderboard</span>
          </button>
        </div>

      </main>

      {/* Clear Confirmation Modal */}
      {showClearModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
          onClick={() => setShowClearModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Clear Campus Leaderboard?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Are you sure you want to clear the entire leaderboard? All verified student records, badge completions, and chapter metrics will be reset to 0.
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                disabled={clearing}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmClearLeaderboard}
                disabled={clearing}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
              >
                {clearing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Clearing...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Yes, Clear All</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
