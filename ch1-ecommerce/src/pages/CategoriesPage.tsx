// src/pages/CategoriesPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, AlertCircle } from 'lucide-react';
import { fetchCategories } from '../api/dummyjson';
import type { Category } from '../api/dummyjson';
import SkeletonLoader from '../components/SkeletonLoader';
import './CategoriesPage.css';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container categories-page">
      <div className="categories-header">
        <h1>Product Categories</h1>
        <p>Explore Shuwadilu's by product category.</p>
      </div>

      {loading ? (
        <SkeletonLoader count={6} />
      ) : error ? (
        <div className="state-box">
          <AlertCircle size={40} className="danger" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="category-card"
            >
              <div className="category-icon-box">
                <Layers size={24} className="cat-icon" />
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <span className="explore-link">
                  Explore Products <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
