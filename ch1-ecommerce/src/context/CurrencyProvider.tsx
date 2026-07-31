// src/context/CurrencyProvider.tsx
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { CurrencyContext } from './currencyContext';
import type { CurrencyCode, CurrencyConfig } from './currencyContext';

const STORAGE_KEY = 'shuwadilu_currency';

export const AVAILABLE_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  RWF: {
    code: 'RWF',
    label: 'English-RWF',
    symbol: 'RF',
    rateVsUSD: 1380,
  },
  USD: {
    code: 'USD',
    label: 'English-USD',
    symbol: '$',
    rateVsUSD: 1.0,
  },
  EUR: {
    code: 'EUR',
    label: 'English-EUR',
    symbol: '€',
    rateVsUSD: 0.92,
  },
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
      return saved && AVAILABLE_CURRENCIES[saved] ? saved : 'RWF';
    } catch {
      return 'RWF';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currency);
    } catch (e) {
      console.error('Failed to save currency to localStorage:', e);
    }
  }, [currency]);

  const setCurrency = (code: CurrencyCode) => {
    if (AVAILABLE_CURRENCIES[code]) {
      setCurrencyState(code);
    }
  };

  const formatPrice = (usdAmount: number): string => {
    const config = AVAILABLE_CURRENCIES[currency];
    const converted = usdAmount * config.rateVsUSD;

    if (currency === 'RWF') {
      return `${config.symbol} ${Math.round(converted).toLocaleString()}`;
    }
    if (currency === 'EUR') {
      return `${config.symbol}${converted.toFixed(2)}`;
    }
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        availableCurrencies: AVAILABLE_CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
