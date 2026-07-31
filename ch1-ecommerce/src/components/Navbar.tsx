// src/components/Navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Globe, User, ShieldCheck, Sparkles, ChevronDown, X, Heart, Check } from 'lucide-react';
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';
import { useCurrency } from '../context/useCurrency';
import type { CurrencyCode } from '../context/currencyContext';
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
  const { totalFavorites } = useWishlist();
  const { currency, setCurrency, availableCurrencies } = useCurrency();

  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <div className="navbar-container">
          {/* Left Section: Brand Logo & Desktop Navigation Links */}
          <div className="navbar-left">
            <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src="/shuwadilu-horizontal.png"
                alt="Shuwadilu"
                className="navbar-brand-logo"
              />
            </Link>

            <div className="navbar-quick-links desktop-only">
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

          {/* Right Section: Desktop Widgets & Mobile Controls */}
          <div className="navbar-right">
            {/* Desktop Widgets */}
            <div className="desktop-only-widgets">
              {/* Deliver To Widget */}
              <div className="nav-widget deliver-widget" title="Select Delivery Location">
                <span className="widget-label">Deliver to:</span>
                <div className="widget-value">
                  <RwandaFlag />
                  <span className="country-code">RW</span>
                </div>
              </div>

              {/* Language & Functional Currency Selector Dropdown */}
              <div className="currency-widget-wrapper">
                <div
                  className="nav-widget lang-widget"
                  title="Select Currency"
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                >
                  <Globe size={16} className="lang-icon" />
                  <span className="lang-text">{availableCurrencies[currency].label}</span>
                  <ChevronDown size={12} className={`widget-arrow ${isCurrencyDropdownOpen ? 'open' : ''}`} />
                </div>

                {isCurrencyDropdownOpen && (
                  <div className="currency-dropdown-menu">
                    <div className="dropdown-menu-header">Select Platform Currency</div>
                    {(Object.keys(availableCurrencies) as CurrencyCode[]).map((code) => (
                      <button
                        key={code}
                        className={`currency-option ${currency === code ? 'active' : ''}`}
                        onClick={() => {
                          setCurrency(code);
                          setIsCurrencyDropdownOpen(false);
                        }}
                      >
                        <span className="code">{code}</span>
                        <span className="label">{availableCurrencies[code].label}</span>
                        {currency === code && <Check size={14} className="check-icon" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Favorites / Wishlist Link */}
            <Link to="/wishlist" className="wishlist-nav-link" title="View Saved Favorites" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="wishlist-icon-wrapper">
                <Heart size={20} className={totalFavorites > 0 ? "filled-heart" : ""} fill={totalFavorites > 0 ? "currentColor" : "none"} />
                {totalFavorites > 0 && (
                  <span className="wishlist-badge">{totalFavorites}</span>
                )}
              </div>
              <span className="cart-label desktop-only">Wish list</span>
            </Link>

            {/* Shopping Cart Link (Always Visible) */}
            <Link to="/cart" className="cart-link" title="View Shopping Cart" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="cart-icon-wrapper">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </div>
              <span className="cart-label desktop-only">Cart</span>
            </Link>

            {/* Desktop User Account Controls */}
            <div className="auth-group desktop-only">
              <button className="sign-in-btn">
                <User size={16} />
                <span>Sign in</span>
              </button>
              <button className="create-account-btn">
                Create account
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <img src="/shuwadilu-horizontal.png" alt="Shuwadilu" className="drawer-logo" />
              <button className="close-drawer-btn" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-content">
              {/* User Account Controls */}
              <div className="mobile-auth-section">
                <button className="sign-in-btn mobile-full">
                  <User size={16} />
                  <span>Sign in</span>
                </button>
                <button className="create-account-btn mobile-full">
                  Create account
                </button>
              </div>

              {/* Delivery & Currency Selectors */}
              <div className="mobile-widgets-group">
                <div className="nav-widget deliver-widget">
                  <span className="widget-label">Deliver to:</span>
                  <div className="widget-value">
                    <RwandaFlag />
                    <span className="country-code">RW</span>
                  </div>
                </div>

                {/* Mobile Currency Selector Buttons */}
                <div className="mobile-currency-selector">
                  <span className="mobile-currency-label">Currency:</span>
                  <div className="mobile-currency-options">
                    {(Object.keys(availableCurrencies) as CurrencyCode[]).map((code) => (
                      <button
                        key={code}
                        className={`mobile-curr-btn ${currency === code ? 'active' : ''}`}
                        onClick={() => setCurrency(code)}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="mobile-nav-links">
                <Link to="/categories" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <Menu size={18} />
                  <span>All Categories</span>
                </Link>
                <Link to="/" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShieldCheck size={18} />
                  <span>Verified Products</span>
                </Link>
                <Link to="/" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <Sparkles size={18} className="sparkle-icon" />
                  <span>Hot Deals</span>
                </Link>
                <Link to="/wishlist" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <Heart size={18} />
                  <span>Wish list ({totalFavorites})</span>
                </Link>
                <Link to="/cart" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingCart size={18} />
                  <span>Shopping Cart ({totalItems})</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
