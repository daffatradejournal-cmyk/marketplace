import { Product, CartItem, StoreConfig } from '../types';

const PRODUCTS_KEY = 'katalog_shopee_products_v1';
const CONFIG_KEY = 'katalog_shopee_config_v2';
const CART_KEY = 'katalog_shopee_cart_v1';
const ADMIN_SESSION_KEY = 'katalog_shopee_admin_session_v1';

export const DEFAULT_CONFIG: StoreConfig = {
  id: 'store_config_default',
  storeName: 'KRIYA & GAYA',
  storeTagline: 'Katalog Produk Terkurasi • Pengrajin & Brand Mandiri Indonesia',
  whatsappNumber: '6283197516720',
  greetingMessage: 'Halo Admin, saya ingin memesan barang dari katalog website dengan rincian berikut:',
  footerMessage: 'Mohon konfirmasi ketersediaan stok serta informasi total biaya dan nomor rekening pembayarannya. Terima kasih!',
  adminPin: 'admin123',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_01',
    name: 'Kemeja Linen Lengan Pendek - Earth Sand',
    slug: 'kemeja-linen-lengan-pendek-earth-sand',
    description: 'Kemeja kasual berbahan 100% serat linen murni bertekstur sejuk. Dipotong santai dengan kerah camp collar kontemporer, kancing tempurung kelapa alami, dan saku dada tunggal. Sangat nyaman untuk iklim tropis seharian.',
    price: 249000,
    discountPrice: 199000,
    category: 'Pakaian',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Ukuran S', 'Ukuran M', 'Ukuran L', 'Ukuran XL'],
    isAvailable: true,
    createdAt: new Date('2026-01-10').toISOString(),
    updatedAt: new Date('2026-01-10').toISOString(),
  },
  {
    id: 'prod_02',
    name: 'Tas Kanvas Jinjing Serbaguna (Heavyweight Tote)',
    slug: 'tas-kanvas-jinjing-serbaguna',
    description: 'Tas tote kanvas 16oz tebal tahan abrasi dengan kompartemen laptop 14 inci, resleting utama YKK premium, serta saku dalam untuk botol minum dan kunci. Tali jinjing diperkuat jahitan bartack ganda.',
    price: 185000,
    discountPrice: 145000,
    category: 'Tas & Dompet',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Warna Natural Off-White', 'Warna Olive Army', 'Warna Washed Black'],
    isAvailable: true,
    createdAt: new Date('2026-01-11').toISOString(),
    updatedAt: new Date('2026-01-11').toISOString(),
  },
  {
    id: 'prod_03',
    name: 'Sepatu Sneaker Kanvas Vulkanisir - Broken White',
    slug: 'sepatu-sneaker-kanvas-vulkanisir',
    description: 'Sneaker siluet klasik low-cut buatan perajin lokal dengan konstruksi sol karet vulkanisir tahan banting. Insole busa EVA ganda berpori memastikan kaki tetap empuk dan tidak gerah saat dipakai jalan jauh.',
    price: 369000,
    discountPrice: 289000,
    category: 'Sepatu & Sandal',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Size 39', 'Size 40', 'Size 41', 'Size 42', 'Size 43'],
    isAvailable: true,
    createdAt: new Date('2026-01-12').toISOString(),
    updatedAt: new Date('2026-01-12').toISOString(),
  },
  {
    id: 'prod_04',
    name: 'Dompet Kulit Asli Bifold Nabati (Vegetable Tanned)',
    slug: 'dompet-kulit-asli-bifold-nabati',
    description: 'Dibuat dari 100% kulit sapi lokal tersamak nabati (vegtan) grade A. Warna kulit akan mengalami patina unik dan mengilap seiring pemakaian harian. Dilengkapi 6 slot kartu, 2 slot tersembunyi, dan 1 kompartemen uang kertas.',
    price: 275000,
    category: 'Tas & Dompet',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606503827447-98782a21a580?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Warna Tan Natural', 'Warna Deep Brown', 'Warna Hitam'],
    isAvailable: true,
    createdAt: new Date('2026-01-14').toISOString(),
    updatedAt: new Date('2026-01-14').toISOString(),
  },
  {
    id: 'prod_05',
    name: 'Kacamata Hitam Polarized Asetat - Classic Tortoise',
    slug: 'kacamata-hitam-polarized-asetat',
    description: 'Bingkai asetat selulosa handmade dengan engsel 5-barrel kokoh. Lensa polarized UV400 anti-silau berstandar optik, melindungi mata dari paparan sinar UV tropis sekaligus mempertegas kontras pandangan.',
    price: 220000,
    discountPrice: 175000,
    category: 'Aksesoris',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Tortoise Brown', 'Solid Matte Black'],
    isAvailable: true,
    createdAt: new Date('2026-01-15').toISOString(),
    updatedAt: new Date('2026-01-15').toISOString(),
  },
  {
    id: 'prod_06',
    name: 'Cangkir Keramik Studio Handmade 220ml - Sand Glaze',
    slug: 'cangkir-keramik-studio-handmade-sand-glaze',
    description: 'Cangkir kopi keramik stoneware buatan tangan studio gerabah lokal. Glasir matte pasir alami berpadu dengan dasar tanah liat kasar tanpa lapisan. Microwave & dishwasher safe.',
    price: 95000,
    category: 'Lifestyle & Rumah',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Varian Sand Dune', 'Varian Terakota Basah', 'Varian Abu Vulkanik'],
    isAvailable: true,
    createdAt: new Date('2026-01-16').toISOString(),
    updatedAt: new Date('2026-01-16').toISOString(),
  },
  {
    id: 'prod_07',
    name: 'Kopi Arabika Single Origin Gayo Washed 250gr',
    slug: 'kopi-arabika-single-origin-gayo-washed',
    description: 'Biji kopi arabika specialty dari dataran tinggi Aceh Gayo (1.450 mdpl). Profil sangrai Medium dengan notes aroma melati, jeruk manis, dan aftertaste karamel renyah. Disangrai segar mingguan.',
    price: 98000,
    discountPrice: 85000,
    category: 'Kopi & Camilan',
    images: [
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Biji Utuh (Whole Beans)', 'Giling Kasar (Cold Brew/French Press)', 'Giling Sedang (V60/Aeropress)', 'Giling Halus (Tubruk/Espresso)'],
    isAvailable: true,
    createdAt: new Date('2026-01-17').toISOString(),
    updatedAt: new Date('2026-01-17').toISOString(),
  },
  {
    id: 'prod_08',
    name: 'Celana Santai Katun Twill Relaxed Fit - Sage Green',
    slug: 'celana-santai-katun-twill-relaxed-fit',
    description: 'Celana santai bermodel rileks dengan pinggang karet elastis ber-drawcord katun. Menggunakan bahan stretch cotton twill gramasi sedang yang luwes dan tidak mudah kusut.',
    price: 289000,
    discountPrice: 229000,
    category: 'Pakaian',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Ukuran 30 (S)', 'Ukuran 32 (M)', 'Ukuran 34 (L)', 'Ukuran 36 (XL)'],
    isAvailable: true,
    createdAt: new Date('2026-01-18').toISOString(),
    updatedAt: new Date('2026-01-18').toISOString(),
  },
  {
    id: 'prod_09',
    name: 'Lilin Kedelai Aromaterapi (Soy Wax Candle) - Ubud Rain',
    slug: 'lilin-kedelai-aromaterapi-ubud-rain',
    description: 'Lilin aromaterapi 100% minyak kedelai alami bebas jelaga paraffin dalam toples kaca amber. Menghadirkan aroma segar dedaunan basah, lumut tropis, dan sentuhan kayu cedar penenang pikiran. Daya bakar hingga 45 jam.',
    price: 135000,
    category: 'Lifestyle & Rumah',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Aroma Ubud Rain', 'Aroma Kintamani Dawn', 'Aroma Bali Tobacco & Vanilla'],
    isAvailable: false, // Disengaja untuk demo status Out of Stock
    createdAt: new Date('2026-01-19').toISOString(),
    updatedAt: new Date('2026-01-19').toISOString(),
  },
  {
    id: 'prod_10',
    name: 'Topi Baseball Katun Corduroy Retro - Vintage Navy',
    slug: 'topi-baseball-katun-corduroy-retro',
    description: 'Topi 6-panel gaya vintage terbuat dari corduroy katun lembut dengan bordir tipografi minimalis. Dilengkapi buckle kuningan antik di belakang untuk penyesuaian lingkar kepala yang pas.',
    price: 125000,
    discountPrice: 99000,
    category: 'Aksesoris',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
    ],
    variants: ['Navy Vintage', 'Olive Green', 'Caramel Brown'],
    isAvailable: true,
    createdAt: new Date('2026-01-20').toISOString(),
    updatedAt: new Date('2026-01-20').toISOString(),
  }
];

// Helper to broadcast state changes across components
function broadcast(eventName: string) {
  window.dispatchEvent(new Event(eventName));
}

// ---------------- PRODUCTS ----------------
export function getStoredProducts(): Product[] {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  broadcast('storage-update-products');
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Product {
  const products = getStoredProducts();
  const id = 'prod_' + Date.now();
  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const newProduct: Product = {
    ...product,
    id,
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updated = [newProduct, ...products];
  saveStoredProducts(updated);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getStoredProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedProduct: Product = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  products[index] = updatedProduct;
  saveStoredProducts(products);
  return updatedProduct;
}

export function deleteProduct(id: string): boolean {
  const products = getStoredProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveStoredProducts(filtered);
  return true;
}

export function toggleProductAvailability(id: string): boolean {
  const products = getStoredProducts();
  const item = products.find((p) => p.id === id);
  if (!item) return false;
  item.isAvailable = !item.isAvailable;
  item.updatedAt = new Date().toISOString();
  saveStoredProducts(products);
  return true;
}

export function resetProductsToInitial(): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  broadcast('storage-update-products');
}

// ---------------- CONFIG ----------------
export function getStoreConfig(): StoreConfig {
  try {
    const data = localStorage.getItem(CONFIG_KEY);
    if (!data) {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveStoreConfig(config: StoreConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  broadcast('storage-update-config');
}

// ---------------- CART (Local Storage) ----------------
export function getStoredCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  broadcast('storage-update-cart');
}

export function addToCart(
  product: Product,
  quantity = 1,
  variant?: string
): void {
  const cart = getStoredCart();
  const cartId = `${product.id}${variant ? `_${variant}` : ''}`;
  const existingIndex = cart.findIndex((item) => item.id === cartId);

  const activePrice = product.discountPrice && product.discountPrice > 0 
    ? product.discountPrice 
    : product.price;

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
    cart[existingIndex].isChecked = true; // Auto-select when adding
  } else {
    cart.push({
      id: cartId,
      productId: product.id,
      name: product.name,
      price: activePrice,
      originalPrice: product.discountPrice ? product.price : undefined,
      image: product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      variant: variant || undefined,
      quantity,
      isChecked: true, // Default checked according to PRD
    });
  }

  saveStoredCart(cart);
}

export function updateCartQuantity(cartId: string, quantity: number): void {
  let cart = getStoredCart();
  if (quantity <= 0) {
    cart = cart.filter((item) => item.id !== cartId);
  } else {
    const item = cart.find((i) => i.id === cartId);
    if (item) item.quantity = quantity;
  }
  saveStoredCart(cart);
}

export function toggleCartItemCheck(cartId: string): void {
  const cart = getStoredCart();
  const item = cart.find((i) => i.id === cartId);
  if (item) {
    item.isChecked = !item.isChecked;
    saveStoredCart(cart);
  }
}

export function selectAllCartItems(isChecked: boolean): void {
  const cart = getStoredCart();
  cart.forEach((item) => {
    item.isChecked = isChecked;
  });
  saveStoredCart(cart);
}

export function removeCartItem(cartId: string): void {
  const cart = getStoredCart().filter((item) => item.id !== cartId);
  saveStoredCart(cart);
}

export function clearCart(): void {
  saveStoredCart([]);
}

// ---------------- ADMIN SESSION ----------------
export function isAdminAuthenticated(): boolean {
  try {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    return session === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(authenticated: boolean): void {
  if (authenticated) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
  broadcast('storage-update-admin');
}
