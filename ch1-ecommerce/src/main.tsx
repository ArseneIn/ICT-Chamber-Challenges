// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';
import { WishlistProvider } from './context/WishlistProvider';
import { CurrencyProvider } from './context/CurrencyProvider';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </BrowserRouter>
  </StrictMode>
);
