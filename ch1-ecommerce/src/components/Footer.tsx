// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, CreditCard, Headphones, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      {/* 1. Value Proposition / Guarantee Banner */}
      <div className="footer-guarantee-banner">
        <div className="container guarantee-grid">
          <div className="guarantee-item">
            <Truck size={24} className="g-icon" />
            <div>
              <h4>Express Global Shipping</h4>
              <p>Fast dispatch & trackable delivery</p>
            </div>
          </div>

          <div className="guarantee-item">
            <ShieldCheck size={24} className="g-icon" />
            <div>
              <h4>Shuwadilu Trade Protection</h4>
              <p>100% Order & Money-back Guarantee</p>
            </div>
          </div>

          <div className="guarantee-item">
            <CreditCard size={24} className="g-icon" />
            <div>
              <h4>Secure Payments</h4>
              <p>Mobile Money, Visa & Mastercard</p>
            </div>
          </div>

          <div className="guarantee-item">
            <Headphones size={24} className="g-icon" />
            <div>
              <h4>24/7 Dedicated Support</h4>
              <p>Help center & live chat assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Multi-Column Links Section */}
      <div className="footer-main">
        <div className="container footer-columns-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <img
                src="/shuwadilu-horizontal.png"
                alt="Shuwadilu"
                className="footer-brand-img"
              />
            </Link>
            <p className="brand-tagline">
              The premier marketplace platform for tech, consumer goods, and verified suppliers powered by ICT Chamber.
            </p>
            <p className="location-info">📍 Kigali, Rwanda</p>
          </div>

          {/* Col 1: Customer Service */}
          <div className="footer-col">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/cart">Track My Order</Link></li>
              <li><Link to="/">Shipping & Logistics</Link></li>
              <li><Link to="/">Returns & Refund Policy</Link></li>
              <li><Link to="/">Dispute Resolution</Link></li>
            </ul>
          </div>

          {/* Col 2: About Shuwadilu */}
          <div className="footer-col">
            <h3>About Shuwadilu</h3>
            <ul>
              <li><Link to="/">Corporate Overview</Link></li>
              <li><Link to="/">ICT Chamber Partnership</Link></li>
              <li><Link to="/categories">Product Catalog</Link></li>
              <li><Link to="/">Sustainability & Impact</Link></li>
              <li><Link to="/">Careers & Press</Link></li>
            </ul>
          </div>

          {/* Col 3: Sell & Trade */}
          <div className="footer-col">
            <h3>Sell on Shuwadilu</h3>
            <ul>
              <li><Link to="/">Become a Verified Supplier</Link></li>
              <li><Link to="/">Trade Assurance Program</Link></li>
              <li><Link to="/">Supplier Portal Login</Link></li>
              <li><Link to="/">Logistics Solutions</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Payment Bar */}
      <div className="footer-bottom">
        <div className="container bottom-bar-flex">
          <p className="copyright-text">
            © {new Date().getFullYear()} <strong>Shuwadilu</strong>. Built for ICT Chamber Challenge 1. All rights reserved.
          </p>

          <div className="legal-links">
            <Link to="/">Privacy Policy</Link>
            <span>•</span>
            <Link to="/">Terms of Service</Link>
            <span>•</span>
            <Link to="/">Security</Link>
          </div>

          <div className="payment-badges">
            <span className="pay-badge">MTN Mobile Money</span>
            <span className="pay-badge">Airtel Money</span>
            <span className="pay-badge">Visa</span>
            <span className="pay-badge">Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
