'use client';

import { cn } from '@/lib/utils';

interface PageLoadingProps {
  text?: string;
  className?: string;
}

export function PageLoading({
  text = 'Memuat data SIPS Sumbar…',
  className,
}: PageLoadingProps) {
  return (
    <div
      className={cn(
        // full screen + gradient hijau
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-emerald-800 via-green-700 to-green-800 shadow-xl',
        className
      )}
    >
      {/* Spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-base font-medium text-white">{text}</p>
    </div>
  );
}
