export interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Delivery Address
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  
  // Delivery Options
  deliveryDate: string;
  deliveryTime: string;
  specialInstructions?: string;
  
  // Payment
  paymentMethod: string;
  
  // Additional
  newsletterSignup: boolean;
  termsAccepted: boolean;
  saveAddress: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  quantity: number;
  customization?: string;
  woodType?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  usdConversion?: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
}

export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  price: number;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface CheckoutStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}