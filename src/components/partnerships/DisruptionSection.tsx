import { useEffect, useRef, useState } from 'react';

const shifts = [
  {
    num: '01',
    body: 'Google is now answering search queries with AI before showing any organic results. Your clients\' SEO traffic is already being affected.',
  },
  {
    num: '02',
    body: 'AI agents are doing the work of entire sales teams. Outreach. Qualification. Follow-up. Reporting. Running 24/7 with no salary.',
  },
  {
    num: '03',
    body: 'Agencies offering AI alongside their marketing are closing bigger deals and keeping clients longer. The ones that are not... are losing pitches to the ones that are.',
  },
  {
    num: '04',
    body: 'Your clients are already Googling "AI for my business." The only question is whether they find you or someone else.',
  },
];

export default function ShiftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const refs = itemRefs.current;
      const viewportCenter = window.innerHeight * 0.5;
      let closest = -1;
      let closestDist = Infinity;
      refs.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0a0f1e] py-28 lg:py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <p
          className={`text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3 transition-all duration-600 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          The Shift
        </p>
        <h2
          className={`text-[32px] sm:text-[40px] lg:text-[52px] text-white leading-[1.1] mb-20 max-w-3xl transition-all duration-600 delay-100 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
        >
          This is what is happening right now.
        </h2>

        <div className="mb-20">
          {shifts.map((s, i) => (
            <div
              key={s.num}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`relative pl-4 lg:pl-6 border-b border-white/[0.05] ${i === 0 ? 'border-t border-t-white/[0.05]' : ''}`}
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 600ms ease ${i * 150}ms, transform 600ms ease ${i * 150}ms`,
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
                style={{ background: i === activeIndex ? '#0152ff' : 'transparent' }}
              />
              <div className="relative py-10 lg:py-14 overflow-hidden">
                <span
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[120px] lg:text-[160px] leading-none text-[#0152ff]/[0.06] select-none pointer-events-none"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 900 }}
                >
                  {s.num}
                </span>
                <p
                  className="relative text-[16px] lg:text-[17px] text-white/65 leading-[1.75] max-w-[640px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          className={`text-[22px] lg:text-[24px] text-[#0152ff] text-center leading-[1.3] transition-all duration-600 delay-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
        >
          This is not a trend. It is a shift. And the agencies that move first will be the ones still standing in two years.
        </p>
      </div>
    </section>
  );
}
