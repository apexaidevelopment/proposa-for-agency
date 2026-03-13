import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function CalendlySkeleton({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0A0F1E',
        borderRadius: 16,
        zIndex: 10,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 400ms ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        padding: 40,
        animation: 'skeleton-pulse 1.5s ease-in-out infinite',
      }}
    >
      <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: 160, height: 20, borderRadius: 8, background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ width: 120, height: 14, borderRadius: 6, background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ width: 180, height: 14, borderRadius: 6, background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ width: 140, height: 14, borderRadius: 6, background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ width: 100, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.05)', marginTop: 12 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, width: '100%', maxWidth: 320 }}>
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                margin: '0 auto',
              }}
            />
          ))}
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: 'rgba(255,255,255,0.3)',
            fontSize: 14,
            marginTop: 16,
          }}
        >
          Loading calendar...
        </p>
      </div>
    </div>
  );
}

export default function FinalCtaSection() {
  const ref = useScrollReveal();
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    const checkCalendly = setInterval(() => {
      const iframe = document.querySelector('.calendly-inline-widget iframe');
      if (iframe) {
        setCalendlyLoaded(true);
        clearInterval(checkCalendly);
      }
    }, 200);

    const fallback = setTimeout(() => {
      setCalendlyLoaded(true);
      clearInterval(checkCalendly);
    }, 5000);

    return () => {
      clearInterval(checkCalendly);
      clearTimeout(fallback);
    };
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="book"
      className="bg-[#0152ff] px-6 py-28 lg:py-36 relative overflow-hidden"
      ref={ref}
    >
      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <h2
          className="reveal-hidden text-[36px] sm:text-[48px] lg:text-[64px] text-white leading-[1.1] mb-4"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
        >
          The agencies growing fastest in 2026 are{' '}
          <span style={{ color: '#0a0f1e' }}>the ones adopting AI.</span>
        </h2>
        <p
          className="reveal-hidden text-lg sm:text-xl text-white/80 mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
        >
          Disagree and face the consequences.
        </p>
        <p className="reveal-hidden text-[16px] text-white/70 max-w-[520px] mx-auto mb-10 leading-[1.6]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          This is a 30-minute call. No commitment. No pressure. Just a clear chat to see if your agency could be a fit to work with us.
        </p>
        <div className="reveal-hidden">
          <button
            onClick={scrollToBooking}
            className="bg-white text-[#0152ff] text-base px-12 py-4 rounded-full hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
          >
            Book a Partnership Discovery Call
          </button>
        </div>
      </div>

      <div id="booking" style={{ maxWidth: 1000, margin: '80px auto 0' }}>
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
            minHeight: 700,
            background: '#0A0F1E',
          }}
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/_apexai/partnerships-call?hide_gdpr_banner=1&background_color=0a0f1e&text_color=ffffff&primary_color=0152ff"
            style={{ minWidth: 320, height: 700, width: '100%' }}
          />
          <CalendlySkeleton visible={!calendlyLoaded} />
        </div>
      </div>
    </section>
  );
}
