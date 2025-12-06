export interface Product {
  id: string;
  name: string;
  category: 'kitchen' | 'home-decor' | 'custom';
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  alt: string;
  images: Array<{ url: string; alt: string }>;
  woodType: string;
  artisan: string;
  rating: number;
  reviews: number;
  customizable: boolean;
  inStock: boolean;
  featured: boolean;
  description: string;
  dimensions?: string;
  tags: string[];
}

export interface FilterOptions {
  categories: string[];
  woodTypes: string[];
  priceRange: {
    min: number;
    max: number;
  };
  customizable: boolean | null;
  inStock: boolean | null;
  artisans: string[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface CategoryTile {
  id: string;
  name: string;
  image: string;
  alt: string;
  count: number;
  path: string;
}