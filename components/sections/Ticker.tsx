/** Signature Lagos Energy marquee — pure CSS loop, slightly tilted. */

const items = ["Unlimited data", "No caps", "3-day install", "99.9% uptime", "Fiber to your door", "Prepaid — no contract"];

function Row() {
  return (
    <span className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="display px-5 text-sm font-bold uppercase tracking-[0.18em] text-white md:px-8 md:text-base">
            {t}
          </span>
          <span aria-hidden="true" className="text-white/80">✦</span>
        </span>
      ))}
    </span>
  );
}

export function Ticker({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative z-10 -rotate-1 overflow-hidden ${className}`}>
      <div className="grad-sunset py-3.5 shadow-[0_16px_40px_-20px_rgba(255,31,77,0.8)] md:py-4">
        <div className="ticker-track">
          <Row />
          <Row />
        </div>
      </div>
    </div>
  );
}
