// src/components/SearchAutocompleteDropdown.tsx
import { useState, useEffect } from 'react';
import { Search, Sparkles, Star, ChevronRight, Tag, Loader2 } from 'lucide-react';
import { searchProducts } from '../api/dummyjson';
import type { Product } from '../api/dummyjson';
import { getSearchSuggestions, type SearchSuggestion } from '../data/searchSuggestions';
import { useCurrency } from '../context/useCurrency';
import './SearchAutocompleteDropdown.css';

interface SearchAutocompleteDropdownProps {
  query: string;
  isOpen: boolean;
  onSelectQuery: (fullText: string) => void;
  onSelectProduct: (productId: number) => void;
  onViewAll: () => void;
}

export default function SearchAutocompleteDropdown({
  query,
  isOpen,
  onSelectQuery,
  onSelectProduct,
  onViewAll,
}: SearchAutocompleteDropdownProps) {
  const { formatPrice } = useCurrency();
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || !isOpen) {
      setSuggestions([]);
      setProducts([]);
      setLoadingProducts(false);
      return;
    }

    // 1. Immediate keyword suggestions
    const kwSuggestions = getSearchSuggestions(trimmed);
    setSuggestions(kwSuggestions.slice(0, 5));

    // 2. Debounced API fetch for live matching products
    setLoadingProducts(true);
    const timer = setTimeout(() => {
      searchProducts(trimmed)
        .then((res) => {
          setProducts(res.products.slice(0, 4));
        })
        .catch((err) => {
          console.error('Failed search autocomplete products fetch', err);
          setProducts([]);
        })
        .finally(() => {
          setLoadingProducts(false);
        });
    }, 200);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  if (!isOpen || !query.trim()) return null;

  return (
    <div className="search-popover-card">
      <div className="search-popover-content">
        {/* Left / Top Column: Keyword Autocomplete Suggestions */}
        {suggestions.length > 0 && (
          <div className="popover-section suggestions-column">
            <div className="popover-section-header">
              <Sparkles size={14} className="header-icon" />
              <span>Suggested Searches</span>
            </div>
            <div className="suggestions-list">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="popover-suggestion-item"
                  onClick={() => onSelectQuery(item.fullText)}
                >
                  <Search size={14} className="item-search-icon" />
                  <div className="suggestion-text-wrap">
                    <span className="prefix-text">{item.prefix}</span>
                    <strong className="suffix-text"> {item.suffix}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right / Bottom Column: Live Matching Product Cards */}
        <div className="popover-section products-column">
          <div className="popover-section-header">
            <Tag size={14} className="header-icon" />
            <span>Matching Products</span>
            {loadingProducts && <Loader2 size={13} className="spin-loader" />}
          </div>

          {loadingProducts && products.length === 0 ? (
            <div className="popover-loading-skeleton">
              {[1, 2].map((i) => (
                <div key={i} className="skeleton-item" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="popover-products-list">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="popover-product-card"
                  onClick={() => onSelectProduct(product.id)}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="popover-product-img"
                  />
                  <div className="popover-product-info">
                    <div className="popover-product-title">{product.title}</div>
                    <div className="popover-product-meta">
                      <span className="popover-product-price">
                        {formatPrice(product.price)}
                      </span>
                      <div className="popover-product-rating">
                        <Star size={11} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="card-arrow" />
                </div>
              ))}
            </div>
          ) : (
            <div className="popover-empty-products">
              No matching products found
            </div>
          )}
        </div>
      </div>

      {/* Footer bar */}
      <div className="popover-footer" onClick={onViewAll}>
        <span>Search all results for <strong>"{query}"</strong></span>
        <ChevronRight size={14} />
      </div>
    </div>
  );
}
