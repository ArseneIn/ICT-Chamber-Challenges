// src/context/CartProvider.tsx
// This file only exports one thing: the CartProvider component.
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../api/dummyjson';
import { CartContext } from './cartContext';
import type { CartItem } from './cartContext';

export function CartProvider({ children }: { children: ReactNode }) {
    // Load saved cart from localStorage on first render
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    // Whenever cartItems changes, save it to localStorage automatically
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add product to cart (or increase quantity if already there)
    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    // Remove a product from cart completely
    const removeFromCart = (productId: number) => {
        setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    // Change the quantity of a specific cart item
    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    // Empty the entire cart
    const clearCart = () => setCartItems([]);

    // Total number of items (sum of all quantities)
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Total price
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}
