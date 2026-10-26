import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah, calculateDiscountPercentage } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants && product.variants.length > 0 ? product.variants[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = calculateDiscountPercentage(product.price, product.discountPrice);
  const activePrice = product.discountPrice && product.discountPrice > 0 
    ? product.discountPrice 
    : product.price;

  const handleAddToCart = () => {
    if (!product.isAvailable) return;
    onAddToCart(product, quantity, selectedVariant || undefined);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-elevated border border-surface-border overflow-hidden my-auto flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md hover:bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200 shadow-sm transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-stone-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-surface-border">
          {/* Main Selected Image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-sm">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover ${!product.isAvailable ? 'grayscale opacity-60' : ''}`}
            />
            {discountPercent > 0 && product.isAvailable && (
              <span className="absolute top-3 left-3 bg-brand text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                DISKON {discountPercent}%
              </span>
            )}
            {!product.isAvailable && (
              <span className="absolute top-3 left-3 bg-stone-900 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                Stok Habis
              </span>
            )}
          </div>

          {/* Thumbnails Row if multiple images */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                    selectedImage === idx ? 'border-brand shadow-sm' : 'border-stone-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Assurance Notes */}
          <div className="mt-4 pt-3 border-t border-stone-200 hidden md:grid grid-cols-2 gap-2 text-[11px] text-stone-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>100% Produk Asli</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Kirim dari Toko Mandiri</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Category tag */}
            <div className="text-xs font-semibold text-brand tracking-wider uppercase mb-1">
              {product.category}
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mb-3">
              {product.name}
            </h2>

            {/* Price Box */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 mb-4 flex items-baseline gap-2.5">
              <span className="text-2xl font-black text-brand tracking-tight">
                {formatRupiah(activePrice)}
              </span>
              {product.discountPrice && product.discountPrice > 0 && (
                <span className="text-sm text-stone-400 line-through">
                  {formatRupiah(product.price)}
                </span>
              )}
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                  Pilih Varian: <span className="text-stone-900 font-normal">{selectedVariant}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant === v;
                    return (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                        }`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                Jumlah Pesanan
              </label>
              <div className="inline-flex items-center border border-stone-300 rounded-xl bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || !product.isAvailable}
                  className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={!product.isAvailable}
                  className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                Deskripsi Produk
              </label>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed whitespace-pre-line bg-stone-50/50 p-3 rounded-xl border border-stone-100">
                {product.description}
              </p>
            </div>
          </div>

          {/* Bottom CTA Button */}
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98] ${
                !product.isAvailable
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-brand text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5 animate-bounce" />
                  <span>Berhasil Masuk Keranjang!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>
                    {product.isAvailable ? `Tambah ke Keranjang • ${formatRupiah(activePrice * quantity)}` : 'Barang Sedang Habis'}
                  </span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
