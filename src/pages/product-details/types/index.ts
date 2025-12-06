export interface WoodType {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  image: string;
  alt: string;
  properties: string[];
}

export interface ProductSize {
  id: string;
  name: string;
  dimensions: string;
  priceAdjustment: number;
}

export interface EngravingOption {
  id: string;
  type: 'text' | 'design';
  name: string;
  price: number;
  maxCharacters?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  type: 'main' | 'detail' | '360';
}

export interface ArtisanProfile {
  id: string;
  name: string;
  avatar: string;
  avatarAlt: string;
  experience: string;
  specialization: string;
  bio: string;
  signature: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
  date: string;
  comment: string;
  productImage: string;
  productImageAlt: string;
  verified: boolean;
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  longDescription: string;
  images: ProductImage[];
  specifications: {
    material: string;
    finish: string;
    care: string;
    origin: string;
  };
  artisan: ArtisanProfile;
  reviews: CustomerReview[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sustainabilityCertified: boolean;
}

export interface CustomizationState {
  woodType: string;
  size: string;
  engraving: {
    enabled: boolean;
    type: string;
    text: string;
  };
  quantity: number;
}