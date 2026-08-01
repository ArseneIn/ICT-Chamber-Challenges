// src/components/HeroSearch.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera } from 'lucide-react';
import type { FormEvent, KeyboardEvent } from 'react';
import { getSearchSuggestions, type SearchSuggestion } from '../data/searchSuggestions';
import ImageSearchModal from './ImageSearchModal';
import './HeroSearch.css';

interface HeroSearchProps {
  initialQuery?: string;
}

export default function HeroSearch({ initialQuery = '' }: HeroSearchProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'products' | 'manufacturers' | 'worldwide'>('products');
  const [query, setQuery] = useState(initialQuery);
  const [isHidden, setIsHidden] = useState(false);

  // Auto-complete & Suggestions State
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

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

  // 2. Generate search suggestions dynamically on query change
  useEffect(() => {
    if (query.trim().length > 0) {
      const items = getSearchSuggestions(query);
      setSuggestions(items);
      setShowSuggestions(items.length > 0);
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // 3. Handle outside click to close suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 4. Perform search navigation
  const executeSearch = (searchKeyword: string) => {
    const finalQuery = searchKeyword.trim();
    if (finalQuery) {
      setShowSuggestions(false);
      navigate(`/?search=${encodeURIComponent(finalQuery)}`);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      executeSearch(suggestions[activeIndex].fullText);
    } else {
      executeSearch(query);
    }
  };

  const handleSuggestionClick = (fullText: string) => {
    setQuery(fullText);
    executeSearch(fullText);
  };

  // 5. Keyboard navigation (Arrow keys, Enter, Escape)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
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
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  if (query.trim().length > 0 && suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onKeyDown={handleKeyDown}
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

          {/* Dynamic Auto-complete Suggestions Dropdown Menu */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions-dropdown">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className={`suggestion-item ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => handleSuggestionClick(item.fullText)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <Search size={15} className="suggestion-icon" />
                  <div className="suggestion-text">
                    <span className="suggestion-prefix">{item.prefix}</span>
                    <strong className="suggestion-suffix"> {item.suffix}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
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
