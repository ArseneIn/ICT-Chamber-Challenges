// src/pages/CartPage.tsx
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/useCart';
import { useCurrency } from '../context/useCurrency';
import './CartPage.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const { formatPrice } = useCurrency();
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
    setCheckedOut(true);
    clearCart();
  };

  if (checkedOut) {
    return (
      <main className="container cart-page">
        <div className="checkout-success-box">
          <CheckCircle size={56} className="success-icon" />
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping on Shuwadilu. Your challenge order has been completed.</p>
          <Link to="/" onClick={() => setCheckedOut(false)} className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="container cart-page">
        <div className="empty-cart-box">
          <ShoppingBag size={56} className="empty-icon" />
          <h2>Your Shuwadilu Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="btn-primary">
            <ArrowLeft size={16} /> Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button onClick={clearCart} className="clear-cart-btn">
          <Trash2 size={16} /> Empty Cart
        </button>
      </div>

      <div className="cart-layout">
        {/* Items List */}
        <div className="cart-items-list">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item-card">
              <img src={product.thumbnail} alt={product.title} className="cart-item-img" />

              <div className="cart-item-details">
                <Link to={`/products/${product.id}`} className="cart-item-title">
                  {product.title}
                </Link>
                <span className="cart-item-category">{product.category}</span>
                <span className="cart-item-unit-price">{formatPrice(product.price)} each</span>
              </div>

              {/* Quantity Controls */}
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="qty-btn"
                  title="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="qty-btn"
                  title="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Line Total */}
              <div className="cart-item-total">
                {formatPrice(product.price * quantity)}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(product.id)}
                className="remove-btn"
                title="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-summary-card">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span className="free-text">FREE</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Grand Total:</span>
            <span className="grand-total">{formatPrice(totalPrice)}</span>
          </div>

          <button onClick={handleCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
