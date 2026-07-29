// src/context/cartContext.ts
// This file only holds the context object and shared types.
// Keeping it separate satisfies the react-refresh ESLint rule.
import { createContext } from 'react';
import type { Product } from '../api/dummyjson';

// Shape of a single cart item
export interface CartItem {
    product: Product;
    quantity: number;
}

// Everything the cart context exposes to the rest of the app
export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

// The context object itself — starts as undefined until CartProvider wraps the app
export const CartContext = createContext<CartContextType | undefined>(undefined);
