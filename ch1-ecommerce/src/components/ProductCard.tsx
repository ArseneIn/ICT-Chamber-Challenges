// src/components/ProductCard.tsx
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check, Tag, Heart } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import type { Product } from '../api/dummyjson';
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e: FormEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleFavorite = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <div className="product-image-wrapper">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="product-image"
          />
          {product.discountPercentage > 0 && (
            <span className="badge discount-badge">
              <Tag size={12} />
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
          <span className="badge category-badge">{product.category}</span>

          {/* Favorite Heart Button */}
          <button
            className={`card-heart-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
            title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="product-info">
          {product.brand && <span className="product-brand">{product.brand}</span>}
          <h3 className="product-title">{product.title}</h3>

          <div className="product-rating">
            <Star size={14} className="star-icon" fill="currentColor" />
            <span className="rating-value">{product.rating.toFixed(1)}</span>
            <span className="stock-status">
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          <div className="product-footer">
            <div className="price-box">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="original-price">${originalPrice}</span>
              )}
            </div>

            <button
              className={`add-cart-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              title="Add to Cart"
            >
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
