export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  variants?: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string; // productId + (variant ? `_${variant}` : '')
  productId: string;
  name: string;
  price: number; // active unit price (discountPrice if available, else price)
  originalPrice?: number; // strike-through price if discounted
  image: string;
  variant?: string;
  quantity: number;
  isChecked: boolean;
}

export interface CustomerData {
  name: string;
  address: string;
  notes: string;
}

export interface StoreConfig {
  id: string;
  storeName: string;
  storeTagline: string;
  whatsappNumber: string; // e.g. "6281234567890"
  greetingMessage?: string;
  footerMessage?: string;
  adminPin: string; // Default admin login password/PIN
}

export type Category = 
  | 'Semua'
  | 'Pakaian'
  | 'Aksesoris'
  | 'Sepatu & Sandal'
  | 'Tas & Dompet'
  | 'Lifestyle & Rumah'
  | 'Kopi & Camilan';

export type SortOption = 'terbaru' | 'harga-rendah' | 'harga-tinggi' | 'diskon-terbesar';
