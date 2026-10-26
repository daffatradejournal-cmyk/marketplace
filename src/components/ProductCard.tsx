import React from 'react';
import { Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah, calculateDiscountPercentage } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
}) => {
  const discountPercent = calculateDiscountPercentage(product.price, product.discountPrice);
  const activePrice = product.discountPrice && product.discountPrice > 0 
    ? product.discountPrice 
    : product.price;

  const [isAdded, setIsAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.isAvailable) return;
    onQuickAdd(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-2xl border border-surface-border overflow-hidden flex flex-col transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80'}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            !product.isAvailable ? 'grayscale opacity-60' : ''
          }`}
        />

        {/* Overlay Hover Icon for Desktop */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
          <span className="bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            Lihat Detail
          </span>
        </div>

        {/* Status Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {discountPercent > 0 && product.isAvailable && (
            <span className="bg-brand text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
              HEMAT {discountPercent}%
            </span>
          )}

          {!product.isAvailable && (
            <span className="bg-stone-800 text-stone-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
              Stok Habis
            </span>
          )}
        </div>

        {/* Category Pill Tag */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-sm border border-stone-200/50">
            {product.category}
          </span>
        </div>

      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-2 leading-snug group-hover:text-brand transition-colors mb-2">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex flex-wrap items-baseline gap-1.5 mb-3">
            <span className="text-sm sm:text-base font-extrabold text-brand tracking-tight">
              {formatRupiah(activePrice)}
            </span>
            {product.discountPrice && product.discountPrice > 0 && (
              <span className="text-[11px] sm:text-xs text-stone-400 line-through">
                {formatRupiah(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add CTA */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[11px] text-stone-400 font-medium">
            {product.variants && product.variants.length > 0 
              ? `${product.variants.length} Varian` 
              : 'Siap Kirim'}
          </span>

          <button
            onClick={handleAdd}
            disabled={!product.isAvailable}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition active:scale-95 ${
              !product.isAvailable
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-brand text-white shadow-sm'
            }`}
            title={product.isAvailable ? "Tambah ke Keranjang" : "Stok Habis"}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ditambahkan</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keranjang</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
