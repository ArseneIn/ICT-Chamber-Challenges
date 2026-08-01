// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, AlertCircle, RefreshCw } from 'lucide-react';
import {
  fetchProducts,
  searchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from '../api/dummyjson';
import type { Product, Category } from '../api/dummyjson';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import HeroSearch from '../components/HeroSearch';
import './HomePage.css';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search') || searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('default');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch Categories list once on mount
  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data.slice(0, 10)))
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  // 2. Fetch Products whenever searchKeyword or selectedCategory changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        let res;
        if (searchKeyword.trim()) {
          res = await searchProducts(searchKeyword);
        } else if (selectedCategory !== 'all') {
          res = await fetchProductsByCategory(selectedCategory);
        } else {
          res = await fetchProducts(30);
        }

        if (isMounted) {
          setProducts(res.products);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred while loading products');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [searchKeyword, selectedCategory]);

  // 3. Client-side sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchParams({});
    setSortOption('default');
  };

  return (
    <main className="home-page container">
      {/* Alibaba-Style Central Prominent Search Bar & Mode Tabs */}
      <section className="hero-search-section">
        <HeroSearch initialQuery={searchKeyword} />
      </section>

      {/* Filter & Sort Control Bar */}
      <section className="controls-bar">
        {/* Category Pills */}
        <div className="category-pills">
          <button
            className={`pill ${selectedCategory === 'all' && !searchKeyword ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory('all');
              setSearchParams({});
            }}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`pill ${selectedCategory === cat.slug ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat.slug);
                setSearchParams({});
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
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
      </section>

      {/* Active Filter Summary */}
      {(searchKeyword || selectedCategory !== 'all') && (
        <div className="filter-summary">
          <span>
            Showing results for:{' '}
            <strong>{searchKeyword ? `"${searchKeyword}"` : selectedCategory}</strong>
          </span>
          <button onClick={clearFilters} className="clear-btn">
            Clear Filters
          </button>
        </div>
      )}

      {/* Products Display Area */}
      {loading ? (
        <SkeletonLoader count={8} />
      ) : error ? (
        <div className="state-box error-box">
          <AlertCircle size={40} className="state-icon danger" />
          <h3>Failed to load products</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            <RefreshCw size={16} /> Try Again
          </button>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="state-box empty-box">
          <h3>No products found</h3>
          <p>We couldn't find any items matching your criteria.</p>
          <button onClick={clearFilters} className="retry-btn">
            View All Products
          </button>
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
