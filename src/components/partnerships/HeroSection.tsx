import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, Play, X } from 'lucide-react';

const h1Words = ['AI', 'is', 'now', 'part', 'of', 'the', 'pitch.', '|||', 'Is', 'it', 'part', 'of'];
const WORD_DELAY_MS = 40;

export default function HeroSection() {
  const [on, setOn] = useState(false);
  const [vslOpen, setVslOpen] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!glowRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const fade = (ms: number) => ({
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 500ms cubic-bezier(0.16,1,0.3,1) ${ms}ms, transform 500ms cubic-bezier(0.16,1,0.3,1) ${ms}ms`,
  });

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="min-h-screen bg-[#0a0f1e] grid-bg flex items-center px-6 md:px-12 relative overflow-hidden"
      >
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-transform duration-[800ms] ease-out"
          style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(1,82,255,0.10) 0%, transparent 60%)' }}
        />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 pt-24 pb-16">
          <div>
            <div style={fade(0)}>
              <span
                className="inline-block text-[11px] uppercase tracking-[0.18em] text-[#0152ff] bg-[#0152ff]/[0.12] border border-[#0152ff]/25 rounded-full px-4 py-1.5 mb-8"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Agency Partnerships
              </span>
            </div>

            <h1
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 8vw, 64px)' }}
              className="text-white leading-[1.08] mb-6"
            >
              {h1Words.map((w, i) =>
                w === '|||' ? (
                  <br key={i} />
                ) : (
                  <span
                    key={i}
                    className="inline-block mr-[0.25em]"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? 'translateY(0)' : 'translateY(18px)',
                      transition: `opacity 350ms cubic-bezier(0.16,1,0.3,1) ${i * WORD_DELAY_MS}ms, transform 350ms cubic-bezier(0.16,1,0.3,1) ${i * WORD_DELAY_MS}ms`,
                    }}
                  >
                    {w}
                  </span>
                )
              )}
              <span
                className="inline-block"
                style={{
                  color: '#0152ff',
                  opacity: on ? 1 : 0,
                  transform: on ? 'translateY(0)' : 'translateY(18px)',
                  transition: `opacity 350ms cubic-bezier(0.16,1,0.3,1) ${h1Words.length * WORD_DELAY_MS}ms, transform 350ms cubic-bezier(0.16,1,0.3,1) ${h1Words.length * WORD_DELAY_MS}ms`,
                }}
              >
                yours?
              </span>
            </h1>

            <p
              className="text-base md:text-lg text-white/60 max-w-[480px] leading-[1.7] mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif", ...fade(800) }}
            >
              Agencies adding AI to their offer are winning more clients, retaining them longer, and charging more. We make that possible without you building anything.
            </p>

            <div style={fade(1000)}>
              <button
                onClick={scrollToBooking}
                className="w-full md:w-auto bg-[#0152ff] text-white text-base px-10 py-4 rounded-full hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_0_40px_rgba(1,82,255,0.5)] transition-all duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
              >
                Book a Partnership Discovery Call
              </button>
            </div>
          </div>

          <div style={fade(400)} className="relative">
            <div
              onClick={() => setVslOpen(true)}
              className="relative w-full rounded-2xl border border-white/[0.08] overflow-hidden cursor-pointer group"
              style={{
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, #111827 0%, #0a0f1e 100%)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#0152ff] flex items-center justify-center animate-ring-pulse group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-down hidden md:block" style={fade(1300)}>
          <ChevronDown className="w-5 h-5 text-white/30" />
        </div>
      </section>

      {vslOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-6"
          onClick={() => setVslOpen(false)}
        >
          <div
            className="relative w-full max-w-[80vw] rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16/9', background: '#111827' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVslOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-white/30" style={{ fontFamily: "'JetBrains Mono', monospace" }}>VSL GOES HERE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
