// src/components/HeroSearch.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera } from 'lucide-react';
import type { FormEvent } from 'react';
import ImageSearchModal from './ImageSearchModal';
import SearchAutocompleteDropdown from './SearchAutocompleteDropdown';
import './HeroSearch.css';

interface HeroSearchProps {
  initialQuery?: string;
}

export default function HeroSearch({ initialQuery = '' }: HeroSearchProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'products' | 'manufacturers' | 'worldwide'>('products');
  const [query, setQuery] = useState(initialQuery);
  const [isHidden, setIsHidden] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Image Search Modal State
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 1. Hide hero search when user scrolls past 90px
  useEffect(() => {
    const handleScroll = () => {
      setIsHidden(window.scrollY > 90);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Handle outside click to close suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 3. Perform search navigation
  const executeSearch = (searchKeyword: string) => {
    const finalQuery = searchKeyword.trim();
    if (finalQuery) {
      setShowSuggestions(false);
      navigate(`/?search=${encodeURIComponent(finalQuery)}`);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const handleSelectQuery = (fullText: string) => {
    setQuery(fullText);
    executeSearch(fullText);
  };

  const handleSelectProduct = (productId: number) => {
    setShowSuggestions(false);
    navigate(`/products/${productId}`);
  };

  return (
    <>
      <div className={`hero-search-wrapper${isHidden ? ' hero-search-hidden' : ''}`} ref={containerRef}>
        {/* Search Mode Tabs */}
        <div className="search-tabs">
          <button
            type="button"
            className={`search-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span>Products</span>
            {activeTab === 'products' && <div className="tab-indicator" />}
          </button>

          <span className="tab-separator">|</span>

          <button
            type="button"
            className={`search-tab ${activeTab === 'manufacturers' ? 'active' : ''}`}
            onClick={() => setActiveTab('manufacturers')}
          >
            <span>Sellers</span>
            {activeTab === 'manufacturers' && <div className="tab-indicator" />}
          </button>

          <button
            type="button"
            className={`search-tab ${activeTab === 'worldwide' ? 'active' : ''}`}
            onClick={() => setActiveTab('worldwide')}
          >
            <span>Manufacturers</span>
            {activeTab === 'worldwide' && <div className="tab-indicator" />}
          </button>
        </div>

        {/* Prominent Floating Rounded Search Container */}
        <div className="search-bar-relative-wrapper">
          <form className="hero-search-bar" onSubmit={handleFormSubmit}>
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Search products, brands, or tech (e.g. shoes, laptop, beauty)..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="hero-search-input"
                autoComplete="off"
              />

              {/* Image Search Button */}
              <button
                type="button"
                className="image-search-btn"
                onClick={() => setIsImageSearchOpen(true)}
                title="Search by image / product photo"
              >
                <Camera size={18} />
                <span>Image Search</span>
              </button>
            </div>

            <button type="submit" className="hero-search-btn">
              <Search size={18} />
              <span>Search</span>
            </button>
          </form>

          {/* Dynamic Auto-complete Suggestions + Product Result Cards Dropdown */}
          <SearchAutocompleteDropdown
            query={query}
            isOpen={showSuggestions}
            onSelectQuery={handleSelectQuery}
            onSelectProduct={handleSelectProduct}
            onViewAll={() => executeSearch(query)}
          />
        </div>
      </div>

      {/* Image Search Modal */}
      <ImageSearchModal
        isOpen={isImageSearchOpen}
        onClose={() => setIsImageSearchOpen(false)}
      />
    </>
  );
}
