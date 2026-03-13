import { useEffect, useRef, useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';

const services = [
  {
    title: 'AI Sales Agents',
    body: 'Every lead responded to in seconds, qualified, and booked. No humans needed.',
    gbp: 2000,
    suffix: ' per channel',
  },
  {
    title: 'Voice AI Qualification',
    body: 'Re-engages cold leads before they disappear. Catches, qualifies, and logs every conversation.',
    gbp: 500,
    suffix: '',
  },
  {
    title: 'Intelligent CRM',
    body: 'Pipeline design, lead scoring, automation, and dashboards built around how the team actually works.',
    gbp: 2500,
    suffix: '',
  },
  {
    title: 'AI Lead Generation',
    body: 'Cold email, LinkedIn outbound, and enrichment. Booked meetings land in the calendar.',
    gbp: 1500,
    suffix: '/mo',
  },
  {
    title: 'Database Reactivation',
    body: 'Dormant revenue in the CRM woken up. Multi-channel sequences. Results within 48 hours.',
    gbp: 0,
    suffix: '',
  },
  {
    title: 'Pipeline Automation',
    body: 'Every stage automated. Follow-ups triggered, tasks assigned, deals moved forward.',
    gbp: 1000,
    suffix: '',
  },
  {
    title: 'Sales Intelligence',
    body: 'Every conversation analysed, every pattern surfaced. Objection trends, deal velocity, pipeline health... delivered automatically.',
    gbp: 2000,
    suffix: ' setup',
  },
  {
    title: 'Lead Enrichment',
    body: 'Every lead researched and scored before contact. Company size, intent signals, decision-maker data.',
    gbp: 500,
    suffix: '',
  },
  {
    title: 'Lead Scraping & Database Building',
    body: 'Targeted prospect lists filtered by signals, industry, size, and title. Clean and verified.',
    gbp: 300,
    suffix: '',
  },
];

const pills = [
  'Automated proposals', 'E-signature workflows', 'Call reviews', 'Objection reporting',
  'Competitor alerts', 'Onboarding sequences', 'Invoice chasing', 'Review management',
  'Social proof', 'Performance reporting', 'Lead scoring', 'Reminder sequences',
  'Churn prediction', 'Lapsed reactivation', 'AI receptionists', 'Upsell triggers',
  'NPS automation', 'Knowledge base AI', 'Meeting prep', 'Transcription', 'Custom dashboards',
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { convert } = useCurrency();

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
      const cards = cardRefs.current;
      const viewportCenter = window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (s: typeof services[0]) => {
    if (s.gbp === 0) return 'Performance-based';
    return `From ${convert(s.gbp)}${s.suffix}`;
  };

  return (
    <section id="services" ref={sectionRef} className="bg-[#0a0f1e] py-28 lg:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start mb-12 lg:mb-0">
            <p
              className={`text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3 transition-all duration-600 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              What We Offer
            </p>
            <h2
              className={`text-[32px] sm:text-[40px] lg:text-[44px] text-white leading-[1.1] mb-4 transition-all duration-600 delay-100 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
            >
              Everything we could bring to your clients.
            </h2>
            <p
              className={`text-[16px] text-white/50 leading-[1.7] mb-8 transition-all duration-600 delay-200 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              You pitch it as part of your offer. We partner with you behind the scenes to design, build, and deliver it for your clients.
            </p>

            <div className="hidden lg:block space-y-1">
              {services.map((s, i) => (
                <div
                  key={i}
                  className={`text-[13px] py-1.5 px-3 rounded-lg transition-all duration-200 ${i === activeIndex ? 'text-white bg-white/[0.06]' : 'text-white/30'}`}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                >
                  {s.title}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {services.map((s, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`bg-[#111827] border rounded-2xl p-8 transition-all duration-300 ${i === activeIndex ? 'border-[#0152ff]/30 shadow-[0_0_30px_rgba(1,82,255,0.08)]' : 'border-white/[0.06]'}`}
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 600ms ease ${i * 80}ms, transform 600ms ease ${i * 80}ms, border-color 300ms ease, box-shadow 300ms ease`,
                }}
              >
                <h3
                  className="text-[18px] text-white mb-3"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
                >
                  {s.title}
                </h3>
                <p className="text-[14px] text-white/50 leading-[1.65] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {s.body}
                </p>
                <p className="text-[13px] text-[#0152ff]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {formatPrice(s)}
                </p>
              </div>
            ))}

            <div
              className="bg-[#111827] border border-white/[0.06] rounded-2xl p-8 lg:p-10"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 600ms ease ${services.length * 80}ms, transform 600ms ease ${services.length * 80}ms`,
              }}
            >
              <h3
                className="text-xl text-white mb-3"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
              >
                Bespoke AI Automations
              </h3>
              <p className="text-[15px] text-white/50 leading-[1.75] max-w-[640px] mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                If it does not fit a package, we scope and build it from scratch. We work backwards from the outcome.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {pills.map((pill, i) => (
                  <span
                    key={i}
                    className="inline-block text-[13px] text-[#0152ff] bg-[#0152ff]/10 rounded-full px-4 py-1.5 hover:scale-105 transition-transform duration-200 cursor-default"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <p className="text-[13px] text-[#0152ff] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Bespoke solutions starting from {convert(500)}. Scoped individually.
              </p>
              <p className="text-[15px] text-white/35" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                If you can describe the problem, we can build the solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
