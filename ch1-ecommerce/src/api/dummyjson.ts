// src/api/dummyjson.ts

// 1. TypeScript Interface for Product
export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string;
    sku?: string;
    weight?: number;
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    thumbnail: string;
    images: string[];
    reviews?: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail?: string;
    }[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface Category {
    slug: string;
    name: string;
    url: string;
}

const BASE_URL = 'https://dummyjson.com/products';

// 2. Fetch all products (with optional sorting, limit & skip)
export async function fetchProducts(
    limit = 30,
    skip = 0,
    sortBy?: string,
    order: 'asc' | 'desc' = 'asc'
): Promise<ProductsResponse> {
    let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

    if (sortBy) {
        url += `&sortBy=${encodeURIComponent(sortBy)}&order=${order}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

// 3. Fetch single product details by ID
export async function fetchProductById(id: string | number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product #${id}`);
    }
    return response.json();
}

// 4. Search products by search query
export async function searchProducts(query: string): Promise<ProductsResponse> {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error(`Failed to search products for: ${query}`);
    }
    return response.json();
}

// 5. Fetch all categories list
export async function fetchCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
}

// 6. Fetch products by category slug
export async function fetchProductsByCategory(
    categorySlug: string,
    sortBy?: string,
    order: 'asc' | 'desc' = 'asc'
): Promise<ProductsResponse> {
    let url = `${BASE_URL}/category/${encodeURIComponent(categorySlug)}`;
    if (sortBy) {
        url += `?sortBy=${encodeURIComponent(sortBy)}&order=${order}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch category: ${categorySlug}`);
    }
    return response.json();
}
