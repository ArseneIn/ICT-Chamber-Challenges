// src/components/SkeletonLoader.tsx
import './SkeletonLoader.css';

export default function SkeletonLoader({ count = 8 }: { count?: number }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image pulse"></div>
          <div className="skeleton-content">
            <div className="skeleton-line short pulse"></div>
            <div className="skeleton-line medium pulse"></div>
            <div className="skeleton-line long pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
