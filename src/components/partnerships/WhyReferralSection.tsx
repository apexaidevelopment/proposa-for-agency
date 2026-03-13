import { UserPlus, Cpu, Coins } from 'lucide-react';
import { useScrollReveal, useCountUp } from '../../hooks/useScrollReveal';

const blocks = [
  {
    icon: UserPlus,
    label: 'YOU REFER',
    bold: 'You pitch AI as part of your offer. When a client is interested, you introduce us.',
    muted: '',
  },
  {
    icon: Cpu,
    label: 'WE DELIVER',
    bold: 'We jump on a strategy call with the client, design the solution, build it, and deliver it.',
    muted: 'Your name stays on the relationship. Ours stays behind the scenes.',
  },
  {
    icon: Coins,
    label: 'YOU EARN',
    bold: 'You earn on every project.',
    muted: 'No overhead. No technical questions to answer. No delivery to manage.',
  },
];

export default function PartnershipSection() {
  const ref = useScrollReveal();
  const counter = useCountUp(15);

  return (
    <section id="partnership" className="bg-[#0a0f1e] py-16 lg:py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#111827] rounded-3xl border border-white/[0.05] p-10 sm:p-14 lg:px-20 lg:py-16">
          <p className="reveal-hidden text-[11px] uppercase tracking-[0.18em] text-white/40 mb-10 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Partnership
          </p>

          <h2
            className="reveal-hidden text-[32px] sm:text-[40px] lg:text-[48px] text-white leading-[1.1] mb-10 text-center"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
          >
            How it works between us.
          </h2>

          <div ref={counter.ref} className="reveal-hidden text-center mb-14">
            <span
              className="text-[100px] lg:text-[140px] text-[#0152ff] leading-none"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
            >
              {counter.value}%
            </span>
            <p className="text-[17px] text-white/50 mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              commission on every build. Retainers too, where agreed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blocks.map((block, i) => {
              const Icon = block.icon;
              return (
                <div
                  key={i}
                  className="reveal-hidden bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0152ff]/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-5 h-5 text-[#0152ff]" strokeWidth={2} />
                  </div>
                  <p
                    className="text-[11px] uppercase tracking-[0.18em] text-[#0152ff] mb-4"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
                  >
                    {block.label}
                  </p>
                  <p className="text-[15px] text-white leading-[1.65] mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                    {block.bold}
                  </p>
                  {block.muted && (
                    <p className="text-[14px] text-white/40 leading-[1.65]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {block.muted}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
