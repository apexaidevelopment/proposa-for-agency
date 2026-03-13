import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function FinalCtaSection() {
  const ref = useScrollReveal();

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

      <div id="booking" style={{ marginTop: '80px' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#0A0F1E',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/_apexai/partnerships-call?hide_gdpr_banner=1&background_color=0a0f1e&text_color=ffffff&primary_color=0152ff"
            style={{ minWidth: '320px', height: '700px', width: '100%' }}
          />
        </div>
      </div>
    </section>
  );
}
