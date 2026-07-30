// src/components/PageLoader.tsx
import { ShoppingBag, Laptop, Shirt, Watch, Headphones, Sparkles, Smartphone, Camera } from 'lucide-react';
import './PageLoader.css';

interface PageLoaderProps {
  loadingText?: string;
  fullScreen?: boolean;
}

export default function PageLoader({
  loadingText = 'Loading Shuwadilu Marketplace...',
  fullScreen = true,
}: PageLoaderProps) {
  return (
    <div className={`page-loader-container ${fullScreen ? 'full-screen' : 'inline'}`}>
      {/* Background Floating Product Icons with Fade & Float Animations */}
      <div className="floating-icons-layer">
        <div className="float-icon icon-1"><ShoppingBag size={38} /></div>
        <div className="float-icon icon-2"><Laptop size={42} /></div>
        <div className="float-icon icon-3"><Shirt size={36} /></div>
        <div className="float-icon icon-4"><Watch size={38} /></div>
        <div className="float-icon icon-5"><Headphones size={40} /></div>
        <div className="float-icon icon-6"><Sparkles size={36} /></div>
        <div className="float-icon icon-7"><Smartphone size={38} /></div>
        <div className="float-icon icon-8"><Camera size={40} /></div>
      </div>

      {/* Central Branded Loader Box */}
      <div className="loader-core">
        {/* Concentric Rotating Emerald Circles */}
        <div className="ripple-circle circle-outer"></div>
        <div className="ripple-circle circle-middle"></div>
        <div className="ripple-circle circle-inner"></div>

        {/* Central Shuwadilu Mark with Blinking Pulse */}
        <div className="mark-wrapper">
          <img
            src="/shuwadilu-mark.png"
            alt="Shuwadilu Mark"
            className="blinking-shuwadilu-mark"
          />
        </div>
      </div>

      {/* Loading Tagline */}
      <div className="loader-text-group">
        <span className="brand-name">shuwadilu</span>
        <p className="loading-status">{loadingText}</p>
      </div>
    </div>
  );
}
