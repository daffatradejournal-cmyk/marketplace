import React from 'react';
import { Search, ShoppingBag, ShieldCheck, X } from 'lucide-react';
import { StoreConfig } from '../types';
import { formatRupiah } from '../utils/formatters';

interface HeaderProps {
  config: StoreConfig;
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  cartCount,
  cartSubtotal,
  onOpenCart,
  onOpenAdmin,
  isAdmin,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-surface-warm/95 backdrop-blur-md border-b border-surface-border transition-all">
      {/* Top Banner Notice */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Katalog Resmi Terverifikasi • Langsung Chat WhatsApp • Bebas Biaya Layanan</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0 tracking-tighter">
              {config.storeName.slice(0, 2).toUpperCase() || 'KG'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-stone-900 truncate">
                  {config.storeName}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-brand bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-brand" />
                  Official
                </span>
              </div>
              <p className="text-xs text-stone-500 truncate hidden sm:block">
                {config.storeTagline}
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Cari produk pilihan..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2 rounded-full border border-surface-border bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Actions: Admin Portal & Cart Drawer Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              title={isAdmin ? "Kelola Katalog Toko (Aktif)" : "Login Pengelola Toko"}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition ${
                isAdmin
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-surface-border text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-600 animate-ping' : 'bg-stone-400'}`}></span>
              <span className="hidden sm:inline">{isAdmin ? 'Mode Pengelola' : 'Admin'}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm shadow-sm transition active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-cart-bump shadow">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Keranjang</span>
              {cartCount > 0 && (
                <span className="hidden lg:inline text-xs font-semibold text-stone-300 border-l border-stone-700 pl-2">
                  {formatRupiah(cartSubtotal)}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Cari barang atau kategori..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl border border-surface-border bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
