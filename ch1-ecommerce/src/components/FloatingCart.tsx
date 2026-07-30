// src/components/FloatingCart.tsx
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/useCart';
import './FloatingCart.css';

export default function FloatingCart() {
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();

  // Hide floating cart button if cart is empty OR user is already on the cart page
  if (totalItems === 0 || location.pathname === '/cart') {
    return null;
  }

  const rwfEstimate = Math.round(totalPrice * 1380).toLocaleString();

  return (
    <div className="floating-cart-wrapper">
      <Link to="/cart" className="floating-cart-btn" title="View Cart & Checkout">
        <div className="floating-cart-icon-box">
          <ShoppingCart size={22} />
          <span className="floating-cart-badge">{totalItems}</span>
        </div>

        <div className="floating-cart-info">
          <span className="floating-cart-title">View Cart</span>
          <span className="floating-cart-price">
            ${totalPrice.toFixed(2)} <small>(~ RF {rwfEstimate})</small>
          </span>
        </div>

        <div className="floating-cart-arrow">
          <ArrowRight size={18} />
        </div>
      </Link>
    </div>
  );
}
