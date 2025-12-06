export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  ctaText: string;
  ctaLink: string;
}

export interface FeaturedProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  customizable: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  alt: string;
  productCount: number;
  link: string;
}

export interface ArtisanStory {
  id: number;
  name: string;
  role: string;
  experience: string;
  image: string;
  alt: string;
  story: string;
  specialization: string;
}

export interface CustomerTestimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  alt: string;
  rating: number;
  review: string;
  productPurchased: string;
  date: string;
}

export interface SeasonalCollection {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  products: number;
  link: string;
  startDate: string;
  endDate: string;
}

export interface BrandValue {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface SustainabilityMetric {
  id: number;
  value: string;
  label: string;
  description: string;
  icon: string;
}