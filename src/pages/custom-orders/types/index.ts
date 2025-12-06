export interface WoodType {
  id: string;
  name: string;
  description: string;
  pricePerSqFt: number;
  texture: string;
  color: string;
  durability: string;
  image: string;
  alt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  image: string;
  alt: string;
}

export interface EngravingFont {
  id: string;
  name: string;
  preview: string;
  price: number;
}

export interface CustomOrderFormData {
  category: string;
  woodType: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  engraving: {
    enabled: boolean;
    text: string;
    font: string;
    position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  };
  referenceImages: File[];
  specialInstructions: string;
  quantity: number;
}

export interface PriceBreakdown {
  basePrice: number;
  woodCost: number;
  engravingCost: number;
  dimensionCost: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface OrderStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}