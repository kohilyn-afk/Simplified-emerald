import React from 'react';

// Sleek Minimalist Gold Line Section Divider with Diamond Accent (No floral elements)
export const GoldSectionDivider: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label,
}) => {
  return (
    <div className={`relative flex items-center justify-center my-12 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#ecdab0]" />
      </div>
      <div className="relative px-6 bg-[#ffffff] flex items-center gap-3 text-xs font-mono font-bold text-[#8f6a14] uppercase tracking-wider rounded-full border border-[#ecdab0] py-2 shadow-sm">
        {/* Left Geometric Gold Diamond */}
        <span className="inline-block w-2 h-2 rotate-45 bg-[#cba135] shadow-2xs" />

        <span className="font-serif-luxury tracking-widest text-sm font-semibold text-[#6a4f10]">
          {label || 'Sustainability • Accounting • Advisory'}
        </span>

        {/* Right Geometric Gold Diamond */}
        <span className="inline-block w-2 h-2 rotate-45 bg-[#cba135] shadow-2xs" />
      </div>
    </div>
  );
};
