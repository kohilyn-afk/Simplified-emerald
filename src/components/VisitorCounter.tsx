import React, { useEffect, useState } from 'react';
import { Users, Eye, Activity, Sparkles, TrendingUp, RefreshCw } from 'lucide-react';

interface VisitorData {
  totalVisitors: number;
  todayVisitors: number;
  activeSessions: number;
  isLoading: boolean;
  error: boolean;
}

interface VisitorCounterProps {
  variant?: 'compact' | 'card' | 'badge';
  className?: string;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const [data, setData] = useState<VisitorData>({
    totalVisitors: 0,
    todayVisitors: 0,
    activeSessions: 1,
    isLoading: true,
    error: false,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAndIncrement = async () => {
    setIsRefreshing(true);
    try {
      // Check if session has already incremented
      const hasIncremented = sessionStorage.getItem('kohilyn_visit_incremented');
      const endpoint = hasIncremented ? '/api/visitor-count' : '/api/visitor-count/increment';

      const res = await fetch(endpoint, {
        method: hasIncremented ? 'GET' : 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!hasIncremented) {
        sessionStorage.setItem('kohilyn_visit_incremented', 'true');
      }

      if (!res.ok) throw new Error('Failed to fetch visitor count');
      const json = await res.json();

      if (json.success) {
        setData({
          totalVisitors: json.totalVisitors,
          todayVisitors: json.todayVisitors,
          activeSessions: json.activeSessions,
          isLoading: false,
          error: false,
        });
      }
    } catch (err) {
      console.error('Visitor Counter error:', err);
      setData((prev) => ({ ...prev, isLoading: false, error: true }));
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAndIncrement();

    // Periodically refresh active sessions count every 30 seconds
    const interval = setInterval(() => {
      fetch('/api/visitor-count')
        .then((r) => r.json())
        .then((json) => {
          if (json.success) {
            setData((prev) => ({
              ...prev,
              totalVisitors: json.totalVisitors,
              todayVisitors: json.todayVisitors,
              activeSessions: json.activeSessions,
            }));
          }
        })
        .catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formattedTotal = data.totalVisitors.toLocaleString();
  const formattedToday = data.todayVisitors.toLocaleString();

  // --- COMPACT VARIANT (For Navbar / Header) ---
  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d2318] border border-[#1f4a33] text-xs font-mono text-[#a3c9b3] shadow-sm hover:border-[#e5b958]/50 transition-all ${className}`}
        title="Live Executive Portal Traffic"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]" />
        </span>

        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#f3d38c]" />
          <span className="font-bold text-[#f2faf5]">
            {data.isLoading ? '...' : formattedTotal}
          </span>
          <span className="text-[10px] text-[#78a58a]">Visits</span>
        </div>

        <span className="text-[#1f4a33]">|</span>

        <span className="text-[#34d399] font-medium text-[11px] flex items-center gap-1">
          <Activity className="w-3 h-3 text-[#34d399]" />
          <span>{data.activeSessions} Active</span>
        </span>
      </div>
    );
  }

  // --- BADGE VARIANT (For subtle hero/section header) ---
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#122e20]/80 border border-[#235239] text-[11px] font-mono text-[#90d0a7] ${className}`}>
        <Eye className="w-3.5 h-3.5 text-[#e5b958]" />
        <span>Executive Portal Traffic:</span>
        <strong className="text-[#f3d38c]">{data.isLoading ? '...' : formattedTotal}</strong>
        <span className="text-[#1f4a33]">/</span>
        <span className="text-[#34d399] font-semibold">{data.activeSessions} live</span>
      </div>
    );
  }

  // --- CARD VARIANT (For Footer & Scope Planner) ---
  return (
    <div className={`bg-gradient-to-br from-[#0c2317] via-[#102d1f] to-[#081910] border border-[#1f4d36] rounded-2xl p-5 shadow-xl relative overflow-hidden ${className}`}>
      
      {/* Background Subtle Pattern */}
      <div className="absolute top-0 right-0 p-3 opacity-10 text-[#e5b958] pointer-events-none">
        <Users className="w-24 h-24" />
      </div>

      <div className="relative z-10 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-[#1b432e] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#183d2a] border border-[#e5b958]/40 flex items-center justify-center text-[#f3d38c]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-[#f2faf5] flex items-center gap-1.5">
                Executive Portal Engagement
                <Sparkles className="w-3.5 h-3.5 text-[#e5b958]" />
              </h4>
              <p className="text-[11px] text-[#90d0a7]">Verified C-Suite & Board Sessions</p>
            </div>
          </div>

          <button
            onClick={fetchAndIncrement}
            disabled={isRefreshing}
            title="Refresh Live Statistics"
            className="p-1.5 rounded-lg text-[#78a58a] hover:text-[#f3d38c] hover:bg-[#183d2a] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          
          {/* Total Visits */}
          <div className="bg-[#081810]/80 border border-[#1b432e] rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#78a58a] mb-0.5 flex items-center justify-center gap-1">
              <Eye className="w-3 h-3 text-[#f3d38c]" />
              <span>Total Visits</span>
            </div>
            <div className="font-display text-lg font-bold text-[#f3d38c]">
              {data.isLoading ? '...' : formattedTotal}
            </div>
            <div className="text-[9px] text-[#90d0a7] font-mono">Since Launch</div>
          </div>

          {/* Today's Visits */}
          <div className="bg-[#081810]/80 border border-[#1b432e] rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#78a58a] mb-0.5 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#90d0a7]" />
              <span>Today</span>
            </div>
            <div className="font-display text-lg font-bold text-[#f2faf5]">
              {data.isLoading ? '...' : formattedToday}
            </div>
            <div className="text-[9px] text-[#90d0a7] font-mono">Sessions</div>
          </div>

          {/* Active Live */}
          <div className="bg-[#081810]/80 border border-[#1b432e] rounded-xl p-3 text-center relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#78a58a] mb-0.5 flex items-center justify-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]" />
              </span>
              <span>Active Now</span>
            </div>
            <div className="font-display text-lg font-bold text-[#34d399]">
              {data.isLoading ? '...' : data.activeSessions}
            </div>
            <div className="text-[9px] text-[#34d399] font-mono font-medium">Live C-Suite</div>
          </div>

        </div>

        {/* Footer note */}
        <div className="text-[10px] font-mono text-[#628f73] text-center pt-1 flex items-center justify-center gap-1">
          <span>Koh I-Lyn & Co Privacy Preserving Session Analytics</span>
        </div>

      </div>
    </div>
  );
};
