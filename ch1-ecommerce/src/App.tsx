// src/App.tsx
import { Routes, Route } from 'react-router-dom';

// Pages (we'll create these one by one)
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import CartPage from './pages/CartPage';

// Shared layout component (we'll build this next)
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      {/* Navbar shows on every page */}
      <Navbar />

      {/* Routes define which page component renders for which URL */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:slug" element={<CategoryProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
