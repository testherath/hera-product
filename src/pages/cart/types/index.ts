export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
  woodType: string;
  customization?: string;
  inStock: boolean;
  estimatedDelivery: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

export interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: string;
}