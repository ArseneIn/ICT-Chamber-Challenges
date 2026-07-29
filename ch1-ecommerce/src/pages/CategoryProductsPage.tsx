// src/pages/CategoryProductsPage.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { fetchProductsByCategory } from '../api/dummyjson';
import type { Product } from '../api/dummyjson';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import './CategoryProductsPage.css';

export default function CategoryProductsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    const loadCategoryProducts = async () => {
      try {
        const data = await fetchProductsByCategory(slug);
        if (isMounted) {
          setProducts(data.products);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load category products');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCategoryProducts();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <main className="container category-products-page">
      <Link to="/categories" className="back-link">
        <ArrowLeft size={16} /> All Categories
      </Link>

      <div className="cat-header-bar">
        <div>
          <h1 className="cat-title">{slug?.replace(/-/g, ' ')}</h1>
          <p className="cat-count">
            {loading ? 'Loading items...' : `${products.length} products available`}
          </p>
        </div>

        {/* Sort Select */}
        <div className="sort-box">
          <SlidersHorizontal size={16} className="sort-icon" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader count={6} />
      ) : error ? (
        <div className="state-box">
          <AlertCircle size={40} className="danger" />
          <p>{error}</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="state-box">
          <h3>No products found in this category</h3>
        </div>
      ) : (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
