// src/pages/WishlistPage.tsx
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/useWishlist';
import ProductCard from '../components/ProductCard';
import './WishlistPage.css';

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <main className="container wishlist-page">
        <div className="empty-wishlist-box">
          <Heart size={56} className="empty-icon" />
          <h2>Your Wishlist is Empty</h2>
          <p>Explore products and click the heart icon to save your favorite items here.</p>
          <Link to="/" className="btn-primary">
            <ArrowLeft size={16} /> Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container wishlist-page">
      <div className="wishlist-header">
        <div>
          <h1>Saved Favorites</h1>
          <p>Manage products you've saved to your Shuwadilu wishlist.</p>
        </div>
        <span className="favorites-count-tag">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Saved
        </span>
      </div>

      <div className="products-grid">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
