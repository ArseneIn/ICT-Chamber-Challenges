// src/context/useCart.ts
import { useContext } from 'react';
import { CartContext } from './CartContext';
import type { CartContextType } from './CartContext';

// Custom Hook — makes using the cart super clean in any component
// Usage: const { cartItems, addToCart, totalItems } = useCart();
export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used inside a <CartProvider>');
    }
    return context;
}
