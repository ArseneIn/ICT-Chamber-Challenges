// src/components/HeroSearch.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import type { FormEvent } from 'react';
import './HeroSearch.css';

interface HeroSearchProps {
  initialQuery?: string;
}

export default function HeroSearch({ initialQuery = '' }: HeroSearchProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'products' | 'manufacturers' | 'worldwide'>('products');
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (

    <>


      <div className="hero-search-wrapper">
        <div className="search-tabs">
          <span className="tab-separator">|</span>

          <button
            type="button"
            className={`search-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span>Products</span>
            {activeTab === 'products' && <div className="tab-indicator" />}
          </button>

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
        <form className="hero-search-bar" onSubmit={handleSearch}>
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search products, brands, or tech (e.g. laptop, smartphone)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="hero-search-input"
            />

            {/*<button type="button" className="image-search-btn" title="Image Search">
            <Camera size={18} />
            <span>Image Search</span>
          </button>*/}
          </div>

          <button type="submit" className="hero-search-btn">
            <Search size={18} />
            <span>Search</span>
          </button>
        </form>

      </div>
      {/*Hero section with image*/}
      <div className="hero-section">Hero section for Image
        <div className="image-container"> Image container</div>
      </div>
    </>
  );
}
