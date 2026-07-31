// src/pages/ProductDetailsPage.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Check,
  Heart,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  MessageSquare,
  BadgeCheck,
  Lock,
} from 'lucide-react';
import { fetchProductById } from '../api/dummyjson';
import type { Product } from '../api/dummyjson';
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';
import { useCurrency } from '../context/useCurrency';
import SkeletonLoader from '../components/SkeletonLoader';
import './ProductDetailsPage.css';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<boolean>(false);

  const isLiked = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        if (isMounted) {
          setProduct(data);
          setSelectedImage(data.thumbnail || data.images[0]);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Product not found');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <main className="container product-details-page">
        <SkeletonLoader count={1} />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container product-details-page">
        <div className="state-box">
          <h2>Product Not Found</h2>
          <p>{error || "The product you're looking for doesn't exist."}</p>
          <Link to="/" className="retry-btn">
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const reviewCount = product.reviews ? product.reviews.length : 4;
  const soldEstimate = Math.floor(product.id * 23 + 12);

  return (
    <main className="container product-details-page">
      {/* 1. Breadcrumbs Header */}
      <nav className="breadcrumbs-nav">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/categories">Categories</Link>
        <ChevronRight size={14} />
        <Link to={`/categories/${product.category}`}>{product.category}</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">{product.title}</span>
      </nav>

      {/* 2. Alibaba-Style 3-Column Main Details Layout */}
      <div className="alibaba-details-grid">
        {/* Column 1: Image Gallery & Supplier Card */}
        <div className="col-gallery">
          <div className="gallery-container">
            {/* Vertical Thumbnails Strip */}
            {product.images && product.images.length > 1 && (
              <div className="vertical-thumbnails">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`v-thumb-btn ${selectedImage === img ? 'active' : ''}`}
                    onMouseEnter={() => setSelectedImage(img)}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Main Preview Box */}
            <div className="main-preview-box">
              <img src={selectedImage} alt={product.title} className="main-preview-img" />
              <button
                className={`favorite-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => product && toggleWishlist(product)}
                title={isLiked ? 'Remove from Wishlist' : 'Save to Wishlist'}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Supplier Card Below Main Image */}
          <div className="supplier-card">
            <div className="supplier-header">
              <div className="supplier-name-group">
                <h4>Shuwadilu Verified Direct Supplier</h4>
                <span className="verified-badge">
                  <BadgeCheck size={14} /> Verified
                </span>
              </div>
              <p className="supplier-sub">Kigali, RW • 2 yr • Multispecialty Tech Supplier</p>
            </div>

            <div className="supplier-stats-grid">
              <div className="stat-item">
                <span className="stat-val">4.8 / 5</span>
                <span className="stat-label">Store Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">&lt; 2h</span>
                <span className="stat-label">Response Time</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">&ge; 99%</span>
                <span className="stat-label">On-time Dispatch</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">24%</span>
                <span className="stat-label">Reorder Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Specs, Title, Price & Attributes */}
        <div className="col-center-info">
          {product.brand && <span className="brand-tag">{product.brand}</span>}
          <h1 className="product-main-title">{product.title}</h1>

          {/* Ratings & Sold Stats */}
          <div className="ratings-stats-bar">
            <div className="stars-group">
              <Star size={16} fill="currentColor" className="star-icon" />
              <span className="rating-score">{product.rating.toFixed(1)}</span>
              <span className="reviews-link">({reviewCount} reviews)</span>
            </div>
            <span className="stat-divider">•</span>
            <span className="sold-count">{soldEstimate} sold</span>
          </div>

          {/* Price Box */}
          <div className="alibaba-price-card">
            <div className="price-primary">
              <span className="amount">{formatPrice(product.price)}</span>
            </div>
            <p className="moq-note">
              Minimum order quantity: {product.minimumOrderQuantity || 1} piece
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-selector-row">
            <span className="row-label">Quantity:</span>
            <div className="quantity-stepper">
              <button
                className="step-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="qty-num">{quantity}</span>
              <button
                className="step-btn"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                <Plus size={14} />
              </button>
            </div>
            <span className="stock-info">
              ({product.stock} items available in stock)
            </span>
          </div>

          {/* Customization Tag */}
          <div className="customization-bar">
            <span className="bar-label">Supplier's customization ability:</span>
            <span className="custom-tag">
              <Check size={14} /> Minor customization verified
            </span>
          </div>

          {/* Key Attributes Table */}
          <div className="key-attributes-section">
            <h3>Key Attributes</h3>
            <div className="attributes-grid">
              <div className="attr-cell">
                <span className="attr-name">Category</span>
                <span className="attr-val capitalize">{product.category}</span>
              </div>
              <div className="attr-cell">
                <span className="attr-name">SKU</span>
                <span className="attr-val">{product.sku || `SKU-${product.id}092`}</span>
              </div>
              <div className="attr-cell">
                <span className="attr-name">Weight</span>
                <span className="attr-val">{product.weight ? `${product.weight}g` : 'Standard Weight'}</span>
              </div>
              <div className="attr-cell">
                <span className="attr-name">Dimensions</span>
                <span className="attr-val">
                  {product.dimensions
                    ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`
                    : '12 x 8 x 4 cm'}
                </span>
              </div>
              <div className="attr-cell">
                <span className="attr-name">Warranty</span>
                <span className="attr-val">{product.warrantyInformation || '1 Year Standard Warranty'}</span>
              </div>
              <div className="attr-cell">
                <span className="attr-name">Return Policy</span>
                <span className="attr-val">{product.returnPolicy || '30-day money-back return'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="product-desc-box">
            <h3>Product Overview</h3>
            <p>{product.description}</p>
          </div>
        </div>

        {/* Column 3: Right Sidebar Shipping & Protection Card */}
        <div className="col-sidebar-protection">
          <div className="protection-card">
            <h3>Shipping & Summary</h3>

            <div className="shipping-info-box">
              <Truck size={20} className="shipping-icon" />
              <div>
                <p className="shipping-title">
                  {product.shippingInformation || 'Express Air Delivery'}
                </p>
                <p className="shipping-sub">
                  Calculated at checkout. Fast dispatch to Rwanda & Worldwide.
                </p>
              </div>
            </div>

            <div className="subtotal-summary">
              <div className="subtotal-row">
                <span>Item subtotal:</span>
                <span>{formatPrice(product.price * quantity)}</span>
              </div>
              <div className="subtotal-row">
                <span>Shipping total:</span>
                <span className="free-text">FREE</span>
              </div>
              <div className="subtotal-row total">
                <span>Subtotal:</span>
                <span className="total-val">{formatPrice(product.price * quantity)}</span>
              </div>
            </div>

            {/* Shuwadilu Order Protection */}
            <div className="order-protection-box">
              <h4>
                <ShieldCheck size={18} className="prot-icon" /> Shuwadilu Order Protection
              </h4>
              <div className="protection-feature">
                <Lock size={16} />
                <span>
                  <strong>Secure payments:</strong> SSL encrypted transactions via Mobile Money, Visa & Mastercard.
                </span>
              </div>
              <div className="protection-feature">
                <RotateCcw size={16} />
                <span>
                  <strong>Money-back protection:</strong> Claim a full refund if your item isn't delivered as described.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="sidebar-ctas">
              <button
                className={`add-cart-primary ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                {added ? (
                  <>
                    <Check size={18} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>

              <button className="buy-now-btn" onClick={handleAddToCart}>
                <MessageSquare size={18} /> Send Inquiry / Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Customer Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="reviews-section">
          <h2>Customer Reviews ({product.reviews.length})</h2>
          <div className="reviews-list">
            {product.reviews.map((rev, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{rev.reviewerName}</span>
                    <span className="review-date">
                      {new Date(rev.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="review-stars">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" className="star-icon" />
                    ))}
                  </div>
                </div>
                <p className="review-comment">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
