// src/components/Navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Globe, User, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { useCart } from '../context/useCart';
import CategoriesMegaMenu from './CategoriesMegaMenu';
import './Navbar.css';

// SVG Vector Flag Component for 100% reliable rendering on Windows/Mac
function RwandaFlag() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flag-svg"
    >
      <rect width="20" height="7" fill="#00A3E0" />
      <rect y="7" width="20" height="3.5" fill="#FCD116" />
      <rect y="10.5" width="20" height="3.5" fill="#00A859" />
      <circle cx="15.5" cy="3.5" r="1.6" fill="#FCD116" />
    </svg>
  );
}

export default function Navbar() {
  const { totalItems } = useCart();
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section: Brand Logo & Navigation Links */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img
              src="/shuwadilu-horizontal.png"
              alt="Shuwadilu"
              className="navbar-brand-logo"
            />
          </Link>

          <div className="navbar-quick-links">
            {/* AliExpress Hover Categories Dropdown Wrapper */}
            <div
              className="categories-hover-wrapper"
              onMouseEnter={() => setIsCategoriesHovered(true)}
              onMouseLeave={() => setIsCategoriesHovered(false)}
            >
              <div className="nav-dropdown-btn">
                <Menu size={18} />
                <span>All categories</span>
                <ChevronDown size={14} className="dropdown-arrow" />
              </div>

              {/* Mega Menu Dropdown */}
              {isCategoriesHovered && (
                <CategoriesMegaMenu onClose={() => setIsCategoriesHovered(false)} />
              )}
            </div>

            <Link to="/" className="quick-link">
              <ShieldCheck size={16} />
              <span>Verified Products</span>
            </Link>
            <Link to="/" className="quick-link">
              <Sparkles size={16} className="sparkle-icon" />
              <span>Hot Deals</span>
            </Link>
          </div>
        </div>

        {/* Right Section: Delivery, Language/Currency, Cart & Auth */}
        <div className="navbar-right">
          {/* Deliver To Widget */}
          <div className="nav-widget deliver-widget" title="Select Delivery Location">
            <span className="widget-label">Deliver to:</span>
            <div className="widget-value">
              <RwandaFlag />
              <span className="country-code">RW</span>
            </div>
          </div>

          {/* Language & Currency Selector Widget */}
          <div className="nav-widget lang-widget" title="Language & Currency">
            <Globe size={16} className="lang-icon" />
            <span className="lang-text">English-RWF</span>
            <ChevronDown size={12} className="widget-arrow" />
          </div>

          {/* Shopping Cart Link */}
          <Link to="/cart" className="cart-link" title="View Shopping Cart">
            <div className="cart-icon-wrapper">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </div>
            <span className="cart-label">Cart</span>
          </Link>

          {/* User Account Controls */}
          <div className="auth-group">
            <button className="sign-in-btn">
              <User size={16} />
              <span>Sign in</span>
            </button>
            <button className="create-account-btn">
              Create account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
