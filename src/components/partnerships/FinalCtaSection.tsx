import { useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const skeletonBar = (width: string) => ({
  width,
  height: '14px',
  borderRadius: '6px',
  background: 'rgba(255,255,255,0.06)',
});

const skeletonCircle = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.06)',
};

function CalendarSkeleton() {
  return (
    <div
      id="calendly-skeleton"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        background: '#0A0F1E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        animation: 'skeletonPulse 1.5s infinite ease-in-out',
      }}
    >
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ width: '200px', height: '160px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)' }} />
          <div style={skeletonBar('180px')} />
          <div style={skeletonBar('140px')} />
          <div style={skeletonBar('160px')} />
          <div style={skeletonBar('120px')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={skeletonBar('200px')} />
            <div style={skeletonBar('160px')} />
            <div style={skeletonBar('120px')} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 28px)', gap: '10px' }}>
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} style={skeletonCircle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinalCtaSection() {
  const ref = useScrollReveal();

  useEffect(() => {
    const check = setInterval(() => {
      const iframe = document.querySelector('.calendly-inline-widget iframe');
      const skeleton = document.getElementById('calendly-skeleton');
      if (iframe && skeleton && (iframe as HTMLIFrameElement).getBoundingClientRect().height > 100) {
        skeleton.style.opacity = '0';
        skeleton.style.transition = 'opacity 0.5s ease';
        skeleton.style.pointerEvents = 'none';
        clearInterval(check);
      }
    }, 500);
    return () => clearInterval(check);
  }, []);

  return (
    <section
      id="book"
      className="bg-[#0152ff] px-6 py-16 md:py-28 lg:py-36 relative overflow-hidden"
      ref={ref}
    >
      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <h2
          className="reveal-hidden text-white leading-[1.1] mb-4"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 7vw, 64px)' }}
        >
          The agencies growing fastest in 2026 are{' '}
          <span style={{ color: '#0a0f1e' }}>the ones adopting AI.</span>
        </h2>
        <p
          className="reveal-hidden text-base md:text-lg sm:text-xl text-white/80 mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
        >
          Disagree and face the consequences.
        </p>
        <p className="reveal-hidden text-[15px] md:text-[16px] text-white/70 max-w-[520px] mx-auto mb-10 leading-[1.6]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          This is a 30-minute call. No commitment. No pressure. Just a clear chat to see if your agency could be a fit to work with us.
        </p>
        <div className="reveal-hidden">
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="w-full md:w-auto bg-white text-[#0152ff] text-base px-12 py-4 rounded-full hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
          >
            Book a Partnership Discovery Call
          </button>
        </div>
      </div>

      <div id="booking" className="mt-16 md:mt-20" style={{ scrollMarginTop: 'calc(50vh - 200px)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', background: '#0A0F1E', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', minHeight: '700px' }}>
          <div className="calendly-inline-widget" data-url="https://calendly.com/_apexai/partnerships-call?hide_gdpr_banner=1&background_color=0a0f1e&text_color=ffffff&primary_color=0152ff" style={{ minWidth: '320px', height: '700px', width: '100%', position: 'relative', zIndex: 1 }} />
          <CalendarSkeleton />
        </div>
      </div>
    </section>
  );
}
