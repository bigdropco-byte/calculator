import React from 'react';

interface AdSlotProps {
  slotId?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotId = 'default', className = '' }) => {
  return (
    <div
      className={`w-full my-8 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center text-xs text-slate-400 no-print flex flex-col items-center justify-center min-h-[90px] ${className}`}
      aria-label="Advertisement Placeholder"
    >
      <span className="text-[10px] uppercase font-medium tracking-widest text-slate-400 mb-1">
        Sponsored
      </span>
      <p className="text-slate-400 text-xs">
        Unobtrusive partner placement placeholder #{slotId}
      </p>
    </div>
  );
};
