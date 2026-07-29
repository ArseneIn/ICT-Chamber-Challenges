// src/components/CategoriesMegaMenu.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Laptop,
  Sparkles,
  ShoppingBag,
  Home as HomeIcon,
  Car,
  Watch,
  Shirt,
  Armchair,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { fetchCategories } from '../api/dummyjson';
import type { Category } from '../api/dummyjson';
import './CategoriesMegaMenu.css';

interface CategoriesMegaMenuProps {
  onClose?: () => void;
}

function getCategoryIcon(slug: string) {
  if (slug.includes('phone') || slug.includes('mobile')) return <Smartphone size={18} />;
  if (slug.includes('laptop') || slug.includes('computer')) return <Laptop size={18} />;
  if (slug.includes('beauty') || slug.includes('skin') || slug.includes('fragrance')) return <Sparkles size={18} />;
  if (slug.includes('shirt') || slug.includes('dress') || slug.includes('cloth') || slug.includes('top')) return <Shirt size={18} />;
  if (slug.includes('home') || slug.includes('decor')) return <HomeIcon size={18} />;
  if (slug.includes('furniture')) return <Armchair size={18} />;
  if (slug.includes('auto') || slug.includes('vehicle') || slug.includes('motor')) return <Car size={18} />;
  if (slug.includes('watch') || slug.includes('jewel')) return <Watch size={18} />;
  return <ShoppingBag size={18} />;
}

export default function CategoriesMegaMenu({ onClose }: CategoriesMegaMenuProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>('');

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          setActiveSlug(data[0].slug);
        }
      })
      .catch((err) => console.error('Failed to load categories for menu', err));
  }, []);

  const activeCat = categories.find((c) => c.slug === activeSlug) || categories[0];

  return (
    <div className="mega-menu-flyout">
      {/* Left Sidebar: Categories List */}
      <div className="mega-menu-sidebar">
        {categories.slice(0, 12).map((cat) => (
          <Link
            key={cat.slug}
            to={`/categories/${cat.slug}`}
            className={`mega-sidebar-item ${cat.slug === activeSlug ? 'active' : ''}`}
            onMouseEnter={() => setActiveSlug(cat.slug)}
            onClick={onClose}
          >
            <span className="sidebar-icon">{getCategoryIcon(cat.slug)}</span>
            <span className="sidebar-name">{cat.name}</span>
            <ChevronRight size={14} className="sidebar-arrow" />
          </Link>
        ))}
      </div>

      {/* Right Content Panel */}
      <div className="mega-menu-content">
        {activeCat && (
          <>
            <div className="content-header">
              <h3>{activeCat.name}</h3>
              <Link
                to={`/categories/${activeCat.slug}`}
                className="view-all-link"
                onClick={onClose}
              >
                View All {activeCat.name} Products &rarr;
              </Link>
            </div>

            <div className="mega-section">
              <h4 className="section-title">Recommended Collections</h4>
              <div className="recommended-grid">
                <Link
                  to={`/categories/${activeCat.slug}`}
                  className="rec-card"
                  onClick={onClose}
                >
                  <div className="rec-icon-box">
                    <Sparkles size={20} className="rec-icon" />
                  </div>
                  <span>Trending Choice</span>
                </Link>

                <Link
                  to={`/categories/${activeCat.slug}`}
                  className="rec-card"
                  onClick={onClose}
                >
                  <div className="rec-icon-box">
                    <ShieldCheck size={20} className="rec-icon" />
                  </div>
                  <span>Verified Quality</span>
                </Link>

                <Link
                  to={`/categories/${activeCat.slug}`}
                  className="rec-card"
                  onClick={onClose}
                >
                  <div className="rec-icon-box">
                    <ShoppingBag size={20} className="rec-icon" />
                  </div>
                  <span>Super Deals</span>
                </Link>
              </div>
            </div>

            <div className="mega-section">
              <h4 className="section-title">Shop by Brand</h4>
              <div className="brands-grid">
                {['Shuwadilu Select', 'Apple', 'Samsung', 'Xiaomi', 'Baseus', 'Lenovo'].map(
                  (brand) => (
                    <Link
                      key={brand}
                      to={`/?search=${encodeURIComponent(brand)}`}
                      className="brand-pill"
                      onClick={onClose}
                    >
                      {brand}
                    </Link>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
