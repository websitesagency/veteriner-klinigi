'use client';

export default function EmergencyButton() {
  return (
    <a
      href="tel:+905551234567"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-3 sm:px-4 rounded-full shadow-lg transition-transform hover:scale-105 animate-pulse"
      aria-label="Acil yardim hatti"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span className="font-medium text-sm hidden sm:inline">7/24 Acil</span>
    </a>
  );
}
