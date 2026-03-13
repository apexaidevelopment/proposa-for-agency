import { MessageCircle, Mail, MessageSquare, Phone } from 'lucide-react';
import { useScrollReveal, useCountUp } from '../../hooks/useScrollReveal';
import { useCurrency } from '../../context/CurrencyContext';

const channelsBase = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Agent',
    body: 'Responds, qualifies, books. Same thread.',
    gbp: 2000,
  },
  {
    icon: Mail,
    title: 'Email Agent',
    body: 'Every inbound email read and replied in seconds.',
    gbp: 2000,
  },
  {
    icon: MessageSquare,
    title: 'SMS Agent',
    body: 'The fallback that catches everyone else. 98% open rate.',
    gbp: 2000,
  },
  {
    icon: Phone,
    title: 'Voice AI',
    body: 'Outbound calls that qualify and log to CRM. Human-like. Automatic.',
    gbp: 500,
  },
];

export default function After5Section() {
  const ref = useScrollReveal();
  const stat = useCountUp(391);
  const { convert } = useCurrency();

  return (
    <section id="after5" className="bg-[#0a0f1e] py-16 lg:py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111827] rounded-3xl p-10 sm:p-14 lg:px-20 lg:py-[72px] overflow-hidden relative border border-white/[0.05]">
          <p className="reveal-hidden text-[11px] uppercase tracking-[0.25em] text-[#2EFFA1] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Part of the ApexAI Family
          </p>

          <div className="reveal-hidden mb-4">
            <img src="/LONG_MAIN_LOGO.png" alt="After5 Digital" style={{ height: '60px', width: 'auto', marginBottom: '32px' }} />
          </div>

          <div className="reveal-hidden max-w-[560px] mb-8">
            <p className="text-[17px] text-white/60 leading-[1.65] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              After5 is our AI sales agent product. Built for one problem... leads that arrive when nobody is watching.
            </p>
            <p className="text-[17px] text-white/60 leading-[1.65]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              After hours. Weekends. Bank holidays. Every enquiry captured, qualified, and booked. 24/7.
            </p>
          </div>

          <div
            ref={stat.ref}
            className="reveal-hidden border-l-[3px] border-[#2EFFA1] bg-[#2EFFA1]/[0.05] rounded-lg px-6 py-5 max-w-[600px] mb-14"
          >
            <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }} className="text-[32px] text-[#2EFFA1] leading-none mb-2">
              {stat.value}% <span className="text-[15px] text-white/50 font-normal" style={{ fontFamily: "'DM Sans', sans-serif" }}>increase in conversion</span>
            </p>
            <p className="text-[14px] text-white/40 leading-[1.6]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              when a lead is responded to within one minute. After5 makes that the default.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {channelsBase.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="reveal-hidden bg-white/5 border border-[#2EFFA1]/20 rounded-2xl p-7 hover:border-[#2EFFA1] hover:bg-[#2EFFA1]/[0.06] hover:-translate-y-1 transition-all duration-[250ms]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <div className="w-10 h-10 rounded-[10px] bg-[#2EFFA1]/[0.15] flex items-center justify-center mb-5">
                    <Icon className="w-[18px] h-[18px] text-[#2EFFA1]" strokeWidth={2} />
                  </div>
                  <h3
                    className="text-[17px] text-white mb-2.5"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
                  >
                    {c.title}
                  </h3>
                  <p className="text-[13px] text-white/50 leading-[1.65] mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {c.body}
                  </p>
                  <p className="text-[#2EFFA1] text-[15px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    From {convert(c.gbp)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="reveal-hidden flex flex-col sm:flex-row items-center gap-4 justify-center">
            <a
              href="https://after5.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#2EFFA1] text-[#2EFFA1] text-sm px-9 py-3.5 rounded-full bg-transparent hover:bg-[#2EFFA1]/[0.08] transition-all duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
            >
              Visit After5 Digital
            </a>
            <a
              href="https://after5.digital/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2EFFA1] text-[#0a0f1e] text-sm px-9 py-3.5 rounded-full hover:brightness-[1.08] hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(46,255,161,0.4)] transition-all duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
            >
              Try the Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
