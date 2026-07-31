// src/context/currencyContext.ts
import { createContext } from 'react';

export type CurrencyCode = 'RWF' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  symbol: string;
  rateVsUSD: number;
}

export interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
  availableCurrencies: Record<CurrencyCode, CurrencyConfig>;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);
