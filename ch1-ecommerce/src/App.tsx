// src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';

// Layout & Utility Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import FloatingCart from './components/FloatingCart';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Trigger loader on every route change (including first load / reload)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <PageLoader loadingText="Loading Shuwadilu Marketplace..." fullScreen />;
  }

  return (
    <div className="app">
      {/* Automatically reset scroll position to top (0, 0) on route change */}
      <ScrollToTop />

      {/* Navbar shows on every page — position: fixed, needs spacer below */}
      <Navbar />
      <div className="navbar-spacer" />

      {/* Routes define which page component renders for which URL */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:slug" element={<CategoryProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>

      {/* Floating Quick Cart Action Button */}
      <FloatingCart />

      {/* Global Marketplace Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
