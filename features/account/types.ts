export type AccountTab =
  | 'overview'
  | 'orders'
  | 'addresses'
  | 'settings';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  id: string;
  name: string;
  category?: string;
  volume?: string;
  price: number;
  quantity: number;
  image: string;
  slug?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'KHALTI' | 'ESEWA' | 'COD' | 'CARD';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  shippingAddress: CustomerAddress;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  category: string;
  volume: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  inStock: boolean;
  keyBotanicals: string[];
  addedAt: string;
}

export type AddressType = 'home' | 'work' | 'other';

export interface CustomerAddress {
  id: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  landmark?: string;
  city: string;
  province: string;
  postalCode?: string;
  type: AddressType;
  isDefault: boolean;
}

export interface LoyaltyTierInfo {
  tierName: string;
  points: number;
  pointsToNextTier: number;
  nextTierName: string;
  benefits: string[];
}
