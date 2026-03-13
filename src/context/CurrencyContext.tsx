import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'AUD' | 'AED' | 'MYR';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number;
}

const currencies: Record<CurrencyCode, CurrencyInfo> = {
  GBP: { code: 'GBP', symbol: '\u00A3', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 1.26 },
  EUR: { code: 'EUR', symbol: '\u20AC', rate: 1.16 },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.96 },
  AED: { code: 'AED', symbol: '\u062F.\u0625', rate: 4.63 },
  MYR: { code: 'MYR', symbol: 'RM', rate: 5.93 },
};

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  convert: (gbpAmount: number) => string;
  allCurrencies: CurrencyCode[];
}

const CurrencyCtx = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('GBP');

  const convert = (gbpAmount: number): string => {
    const info = currencies[currency];
    const converted = Math.round(gbpAmount * info.rate);
    return `${info.symbol}${converted.toLocaleString('en-GB')}`;
  };

  const allCurrencies: CurrencyCode[] = ['GBP', 'USD', 'EUR', 'AUD', 'AED', 'MYR'];

  return (
    <CurrencyCtx.Provider value={{ currency, setCurrency, convert, allCurrencies }}>
      {children}
    </CurrencyCtx.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyCtx);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
