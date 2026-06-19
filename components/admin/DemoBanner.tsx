'use client';

export default function DemoBanner() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') return null;

  return (
    <div className="bg-amber-400 text-amber-900 px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 text-center">
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        Bu bir <strong>demo hesaptır</strong> — veriler gerçek değildir. Değişiklikler kaydedilmez.
      </span>
    </div>
  );
}
