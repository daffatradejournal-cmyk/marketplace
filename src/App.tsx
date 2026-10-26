import React, { useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  CartItem, 
  StoreConfig, 
  Category, 
  SortOption 
} from './types';
import {
  getStoredProducts,
  getStoreConfig,
  getStoredCart,
  saveStoreConfig,
  addToCart,
  updateCartQuantity,
  toggleCartItemCheck,
  selectAllCartItems,
  removeCartItem,
  clearCart,
  isAdminAuthenticated,
  setAdminAuthenticated,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProductAvailability,
  resetProductsToInitial
} from './services/storage';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { FloatingCartButton } from './components/FloatingCartButton';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { SearchX, PackageOpen } from 'lucide-react';

const CATEGORIES_LIST: Category[] = [
  'Semua',
  'Pakaian',
  'Aksesoris',
  'Sepatu & Sandal',
  'Tas & Dompet',
  'Lifestyle & Rumah',
  'Kopi & Camilan'
];

export function App() {
  // State from storage
  const [products, setProducts] = useState<Product[]>(getStoredProducts());
  const [config, setConfig] = useState<StoreConfig>(getStoreConfig());
  const [cart, setCart] = useState<CartItem[]>(getStoredCart());
  const [isAdmin, setIsAdmin] = useState<boolean>(isAdminAuthenticated());

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Semua');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Synchronize state across storage events
  useEffect(() => {
    const handleProductsUpdate = () => setProducts(getStoredProducts());
    const handleConfigUpdate = () => setConfig(getStoreConfig());
    const handleCartUpdate = () => setCart(getStoredCart());
    const handleAdminUpdate = () => setIsAdmin(isAdminAuthenticated());

    window.addEventListener('storage-update-products', handleProductsUpdate);
    window.addEventListener('storage-update-config', handleConfigUpdate);
    window.addEventListener('storage-update-cart', handleCartUpdate);
    window.addEventListener('storage-update-admin', handleAdminUpdate);

    return () => {
      window.removeEventListener('storage-update-products', handleProductsUpdate);
      window.removeEventListener('storage-update-config', handleConfigUpdate);
      window.removeEventListener('storage-update-cart', handleCartUpdate);
      window.removeEventListener('storage-update-admin', handleAdminUpdate);
    };
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search matching
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = !q || 
          p.name.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);

        // Category matching
        const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;

        // Availability matching
        const matchesAvailable = !onlyAvailable || p.isAvailable;

        return matchesQuery && matchesCategory && matchesAvailable;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;

        if (sortBy === 'harga-rendah') return priceA - priceB;
        if (sortBy === 'harga-tinggi') return priceB - priceA;
        if (sortBy === 'diskon-terbesar') {
          const discA = a.discountPrice ? ((a.price - a.discountPrice) / a.price) : 0;
          const discB = b.discountPrice ? ((b.price - b.discountPrice) / b.price) : 0;
          return discB - discA;
        }
        // default: terbaru
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, searchQuery, selectedCategory, sortBy, onlyAvailable]);

  // Cart Metrics
  const cartTotalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const checkedSubtotal = useMemo(() => {
    return cart
      .filter((item) => item.isChecked)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, variant?: string) => {
    addToCart(product, quantity, variant);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    updateCartQuantity(cartId, quantity);
  };

  const handleToggleCheck = (cartId: string) => {
    toggleCartItemCheck(cartId);
  };

  const handleSelectAll = (checked: boolean) => {
    selectAllCartItems(checked);
  };

  const handleRemoveItem = (cartId: string) => {
    removeCartItem(cartId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  // Admin Handlers
  const handleAdminLogin = (pin: string): boolean => {
    if (pin.trim() === config.adminPin.trim()) {
      setAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-warm">
      {/* 1. Header with live search & cart trigger */}
      <Header
        config={config}
        cartCount={cartTotalQuantity}
        cartSubtotal={checkedSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdmin={isAdmin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* 2. Curated Hero Banner */}
        <HeroBanner
          config={config}
          totalProducts={products.length}
        />

        {/* 3. Category & Sorting Toolbar */}
        <CategoryFilter
          categories={CATEGORIES_LIST}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onlyAvailable={onlyAvailable}
          onToggleOnlyAvailable={() => setOnlyAvailable(!onlyAvailable)}
          totalFiltered={filteredProducts.length}
        />

        {/* 4. Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {filteredProducts.length === 0 ? (
            /* Empty Search State */
            <div className="py-20 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-surface-border p-8 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-stone-800 mb-1">
                Produk Tidak Ditemukan
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mb-5">
                Tidak ada barang yang cocok dengan kata kunci atau filter yang Anda pilih. Silakan coba kata kunci lain.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                  setOnlyAvailable(false);
                }}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-brand transition"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                  onQuickAdd={(p) => handleAddToCart(p, 1, p.variants ? p.variants[0] : undefined)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 5. Sticky Floating Cart Button */}
      <FloatingCartButton
        itemCount={cartTotalQuantity}
        subtotal={checkedSubtotal}
        onClick={() => setIsCartOpen(true)}
      />

      {/* 6. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 7. Checklist Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        config={config}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleCheck={handleToggleCheck}
        onSelectAll={handleSelectAll}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 8. Admin Management Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        config={config}
        isAuthenticated={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        onToggleStock={toggleProductAvailability}
        onSaveConfig={saveStoreConfig}
        onResetProducts={resetProductsToInitial}
      />

      {/* 9. Inverted Editorial Footer */}
      <Footer
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default App;
