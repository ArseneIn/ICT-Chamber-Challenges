// src/context/wishlistContext.ts
import { createContext } from 'react';
import type { Product } from '../api/dummyjson';

export interface WishlistContextType {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  totalFavorites: number;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
