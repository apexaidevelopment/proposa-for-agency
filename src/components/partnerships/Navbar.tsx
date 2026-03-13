import { useEffect, useState, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import type { CurrencyCode } from '../../context/CurrencyContext';

const navLinks = [
  { label: 'Our Approach', href: '#approach' },
  { label: 'The Difference', href: '#difference' },
  { label: 'Services', href: '#services' },
  { label: 'Partnership', href: '#partnership' },
  { label: 'After5', href: '#after5' },
  { label: 'How It Works', href: '#process' },
];

const currencyLabels: Record<CurrencyCode, string> = {
  GBP: 'GBP (\u00A3)',
  USD: 'USD ($)',
  EUR: 'EUR (\u20AC)',
  AUD: 'AUD (A$)',
  AED: 'AED (\u062F.\u0625)',
  MYR: 'MYR (RM)',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const { currency, setCurrency, allCurrencies } = useCurrency();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
        style={{
          padding: '16px 48px',
          background: scrolled ? 'rgba(10,15,30,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img
            src="/white_ApexAI_logo.png"
            alt="ApexAI"
            className="h-8 w-auto"
          />

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="nav-underline text-white/70 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500 }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div ref={dropdownRef} className="relative hidden sm:block">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1.5 text-white/60 hover:text-white border border-white/10 rounded-full px-3 py-1.5 transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500 }}
              >
                {currency}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>
              {currencyOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#111827] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[140px]">
                  {allCurrencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors duration-150 ${c === currency ? 'text-[#0152ff] bg-[#0152ff]/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                    >
                      {currencyLabels[c]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('#booking')}
              className="bg-[#0152ff] text-white rounded-full hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(1,82,255,0.4)] transition-all duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: '10px 24px',
              }}
            >
              Book a Call
            </button>

            <button
              className="lg:hidden text-white"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0a0f1e] flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-7 h-7" />
          </button>

          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-white text-2xl"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800 }}
              >
                {link.label}
              </button>
            ))}

            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {allCurrencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors duration-200 ${c === currency ? 'border-[#0152ff] text-[#0152ff] bg-[#0152ff]/10' : 'border-white/10 text-white/50'}`}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNav('#booking')}
              className="mt-4 bg-[#0152ff] text-white rounded-full px-8 py-3 text-lg"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
            >
              Book a Call
            </button>
          </div>
        </div>
      )}
    </>
  );
}
