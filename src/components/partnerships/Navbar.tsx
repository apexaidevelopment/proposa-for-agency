import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
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

interface NavbarProps {
  onBookCall: () => void;
}

export default function Navbar({ onBookCall }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const { currency, setCurrency, allCurrencies } = useCurrency();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out px-6 md:px-12"
      style={{
        paddingTop: 16,
        paddingBottom: 16,
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
          className="h-6 md:h-8 w-auto"
        />

        <div className="hidden md:flex items-center gap-8">
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

        <div className="hidden md:flex items-center gap-3">
          <div ref={dropdownRef} className="relative">
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
            onClick={onBookCall}
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
        </div>
      </div>
    </nav>
  );
}
