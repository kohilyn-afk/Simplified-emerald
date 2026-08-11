import React from 'react';

// Elegant Pine & Canopy Tree Vector Silhouette for Hero Section
export const HeroTreeSilhouette: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto min-w-[800px] opacity-80 transition-opacity duration-500"
        preserveAspectRatio="none"
      >
        {/* Sky / Forest Canopy Backlight Glow */}
        <ellipse cx="600" cy="220" rx="500" ry="110" fill="url(#heroForestGlow)" />

        {/* --- LAYER 1: Distant Misty Ridge --- */}
        <path
          d="M-10 220
             L-10 150 
             L20 135 L40 148 L60 130 L80 142 L100 125 L120 138 L140 120 L160 132 L180 115 L200 128 L220 110 L240 122 L260 105 L280 118 L300 100 L320 112 L340 95 L360 108 L380 92 L400 105 L420 88 L440 102 L460 85 L480 98 L500 82 L520 95 L540 78 L560 92 L580 75 L600 88 L620 72 L640 85 L660 78 L680 92 L700 82 L720 95 L740 88 L760 102 L780 92 L800 105 L820 98 L840 112 L860 105 L880 118 L900 112 L920 125 L940 118 L960 132 L980 125 L1000 138 L1020 132 L1040 145 L1060 138 L1080 150 L1100 142 L1120 155 L1140 148 L1160 160 L1180 152 L1210 165
             L1210 220 Z"
          fill="#0c2518"
          opacity="0.6"
        />

        {/* --- LAYER 2: Middle Evergreen Fir & Pine Cluster --- */}
        <g fill="#123523" stroke="#90d0a7" strokeWidth="0.5" strokeOpacity="0.35">
          <path d="M-10 220 L10 130 L0 130 L18 95 L8 95 L26 55 L44 95 L34 95 L52 130 L42 130 L60 220 Z" />
          <path d="M40 220 L58 148 L48 148 L66 110 L56 110 L74 72 L92 110 L82 110 L100 148 L90 148 L110 220 Z" />
          <path d="M90 220 L106 158 L98 158 L114 122 L106 122 L122 85 L138 122 L130 122 L146 158 L138 158 L155 220 Z" />

          <path d="M220 220 L238 142 L228 142 L246 105 L236 105 L254 68 L272 105 L262 105 L280 142 L270 142 L290 220 Z" />
          <path d="M280 220 L298 128 L288 128 L306 90 L296 90 L314 50 L332 90 L322 90 L340 128 L330 128 L350 220 Z" />

          {/* Center Majestic Pine Accent */}
          <path
            d="M570 220 L592 105 L578 105 L600 50 L585 50 L608 10 L631 50 L616 50 L638 105 L624 105 L646 220 Z"
            fill="#18432d"
            stroke="#e5b958"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <path d="M530 220 L548 125 L538 125 L556 85 L546 85 L564 42 L582 85 L572 85 L590 125 L580 125 L600 220 Z" />
          <path d="M625 220 L642 130 L632 130 L650 90 L640 90 L658 48 L676 90 L666 90 L684 130 L674 130 L695 220 Z" stroke="#e5b958" strokeWidth="0.5" strokeOpacity="0.4" />

          <path d="M770 220 L788 120 L776 120 L796 78 L784 78 L804 35 L824 78 L812 78 L832 120 L820 120 L840 220 Z" stroke="#e5b958" strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M830 220 L846 150 L838 150 L854 115 L846 115 L862 78 L878 115 L870 115 L886 150 L878 150 L895 220 Z" />

          <path d="M1030 220 L1046 155 L1038 155 L1054 120 L1046 120 L1062 82 L1078 120 L1070 120 L1086 155 L1078 155 L1095 220 Z" />
          <path d="M1090 220 L1108 128 L1098 128 L1116 90 L1106 90 L1124 50 L1142 90 L1132 90 L1150 128 L1140 128 L1160 220 Z" />
        </g>

        {/* --- LAYER 3: Foreground Anchor Pines --- */}
        <g fill="#091c12" stroke="#2a5c40" strokeWidth="0.8">
          <path d="M20 220 L38 148 L28 148 L44 110 L34 110 L50 68 L66 110 L56 110 L72 148 L62 148 L80 220 Z" stroke="#e5b958" strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M370 220 L388 152 L378 152 L394 115 L384 115 L400 72 L416 115 L406 115 L422 152 L412 152 L430 220 Z" stroke="#90d0a7" strokeWidth="0.5" strokeOpacity="0.5" />
          <path d="M750 220 L768 152 L758 152 L774 115 L764 115 L780 72 L796 115 L786 115 L802 152 L792 152 L810 220 Z" stroke="#90d0a7" strokeWidth="0.5" strokeOpacity="0.5" />
          <path d="M1010 220 L1028 148 L1018 148 L1034 110 L1024 110 L1040 68 L1056 110 L1046 110 L1062 148 L1052 148 L1070 220 Z" stroke="#e5b958" strokeWidth="0.5" strokeOpacity="0.4" />
        </g>

        {/* --- LAYER 4: Forest Floor Mist Transition --- */}
        <rect x="0" y="170" width="1200" height="50" fill="url(#heroGroundMist)" />

        <defs>
          <radialGradient id="heroForestGlow" cx="50%" cy="100%" r="50%">
            <stop offset="0%" stopColor="#225239" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#123022" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#091710" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="heroGroundMist" x1="0" y1="170" x2="0" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#091710" stopOpacity="0" />
            <stop offset="50%" stopColor="#091710" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#091710" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Elegant Tree Line Section Divider with Pine Tree Symbol
export const TreeSectionDivider: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label,
}) => {
  return (
    <div className={`relative flex items-center justify-center my-12 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#1f4230]" />
      </div>
      <div className="relative px-6 bg-[#091710] flex items-center gap-3 text-xs font-mono font-bold text-[#f3d38c] uppercase tracking-wider rounded-full border border-[#1f4230] py-1.5 shadow-sm">
        {/* Left Pine Tree Icon */}
        <svg className="w-4 h-4 text-[#90d0a7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2-8 8h5l-4 7h6v5h2v-5h6l-4 7h5z" />
        </svg>

        <span>{label || 'Sustainability • Forestry • Accounting'}</span>

        {/* Right Pine Tree Icon */}
        <svg className="w-4 h-4 text-[#90d0a7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2-8 8h5l-4 7h6v5h2v-5h6l-4 7h5z" />
        </svg>
      </div>
    </div>
  );
};

// Decorative Corner Pine Tree Motif for Cards
export const CornerTreeAccent: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none text-[#e5b958]/20 ${className}`}>
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M32 4 L16 22 L22 22 L10 38 L20 38 L8 52 L28 52 L28 60 L36 60 L36 52 L56 52 L44 38 L54 38 L42 22 L48 22 Z" />
      </svg>
    </div>
  );
};
