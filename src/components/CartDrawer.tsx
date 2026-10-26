import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  CheckSquare, 
  Square, 
  ShoppingBag, 
  Copy, 
  Check, 
  ArrowRight,
  User,
  MapPin,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CustomerData, StoreConfig } from '../types';
import { formatRupiah, buildWhatsAppUrl, generateWhatsAppMessage } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  config: StoreConfig;
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onToggleCheck: (cartId: string) => void;
  onSelectAll: (checked: boolean) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  config,
  onUpdateQuantity,
  onToggleCheck,
  onSelectAll,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [customer, setCustomer] = useState<CustomerData>({
    name: '',
    address: '',
    notes: '',
  });

  const [isCopied, setIsCopied] = useState(false);

  // Calculations
  const checkedItems = cart.filter((item) => item.isChecked);
  const checkedCount = checkedItems.length;
  const totalItemsCount = cart.length;
  const isAllChecked = totalItemsCount > 0 && checkedCount === totalItemsCount;

  const dynamicSubtotal = checkedItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  const handleCheckoutWhatsApp = () => {
    if (checkedCount === 0) return;

    // Trigger delightful celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // Ignore if confetti fails
    }

    const waUrl = buildWhatsAppUrl(config, cart, customer);
    window.open(waUrl, '_blank');
  };

  const handleCopyMessage = () => {
    if (checkedCount === 0) return;
    const msg = generateWhatsAppMessage(config, cart, customer);
    navigator.clipboard.writeText(msg);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm transition-opacity animate-fade-in flex justify-end">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container (Slide-over on desktop, bottom sheet / full on mobile) */}
      <div className="relative w-full max-w-lg bg-surface-warm h-full shadow-2xl flex flex-col z-10 border-l border-surface-border">
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Keranjang Belanja</h2>
              <p className="text-xs text-stone-500">
                Centang barang yang ingin Anda checkout ke WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Checklist Bar */}
        {cart.length > 0 && (
          <div className="px-5 py-2.5 bg-stone-50 border-b border-surface-border flex items-center justify-between text-xs">
            <label 
              onClick={() => onSelectAll(!isAllChecked)}
              className="flex items-center gap-2 font-semibold text-stone-700 cursor-pointer select-none hover:text-stone-900"
            >
              {isAllChecked ? (
                <CheckSquare className="w-4 h-4 text-brand" />
              ) : (
                <Square className="w-4 h-4 text-stone-400" />
              )}
              <span>Pilih Semua ({checkedCount}/{totalItemsCount} Barang)</span>
            </label>

            {cart.length > 1 && (
              <button
                onClick={onClearCart}
                className="text-stone-400 hover:text-red-600 transition"
                title="Kosongkan Semua"
              >
                Hapus Semua
              </button>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <div className="w-16 h-16 rounded-2xl bg-white border border-stone-200 flex items-center justify-center mb-3 text-stone-300 shadow-sm">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-stone-700 mb-1">Keranjang Masih Kosong</h3>
              <p className="text-xs text-stone-500 max-w-xs mb-4">
                Pilih barang dari etalase katalog dan klik tombol tambah untuk mulai berbelanja.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 hover:bg-brand text-white text-xs font-semibold rounded-xl transition shadow-sm"
              >
                Jelajahi Produk
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className={`flex gap-3 p-3.5 rounded-2xl bg-white border transition-all ${
                  item.isChecked 
                    ? 'border-brand/40 shadow-sm bg-brand-50/20' 
                    : 'border-stone-200 opacity-70'
                }`}
              >
                {/* Item Checkbox */}
                <button
                  type="button"
                  onClick={() => onToggleCheck(item.id)}
                  className="mt-1 flex-shrink-0 text-stone-400 hover:text-stone-700"
                >
                  {item.isChecked ? (
                    <CheckSquare className="w-5 h-5 text-brand" />
                  ) : (
                    <Square className="w-5 h-5 text-stone-300" />
                  )}
                </button>

                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200/60">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-1">
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                        {item.name}
                      </h4>
                      {item.variant && (
                        <span className="inline-block text-[10px] font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded mt-0.5">
                          {item.variant}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-red-500 p-1 -mr-1 transition"
                      title="Hapus barang"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-xs sm:text-sm font-bold text-stone-900">
                      {formatRupiah(item.price * item.quantity)}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}

          {/* Form Data Pemesan (PRD F-PUB-04 Requirement) */}
          {cart.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-surface-border mt-4 shadow-sm space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 uppercase tracking-wider pb-2 border-b border-stone-100">
                <User className="w-3.5 h-3.5 text-brand" />
                <span>Informasi Pemesan (Opsional)</span>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Alamat / Kota Pengiriman
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jl. Sudirman No. 12, Bandung"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Catatan Tambahan
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Tolong packing dengan bubble wrap tebal..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer / Dynamic Subtotal & WhatsApp Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-surface-border shadow-lg space-y-3">
            
            {/* Dynamic Summary */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs text-stone-500">
                <span>Subtotal ({checkedCount} barang terpilih)</span>
                <span className="text-base sm:text-lg font-black text-brand tracking-tight">
                  {formatRupiah(dynamicSubtotal)}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                * Estimasi harga belum termasuk ongkir (akan dikonfirmasi admin via chat).
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {/* WhatsApp Checkout Button */}
              <button
                type="button"
                onClick={handleCheckoutWhatsApp}
                disabled={checkedCount === 0}
                className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98] ${
                  checkedCount === 0
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-[#25D366] hover:bg-[#1ebd59] text-white shadow-[#25D366]/20'
                }`}
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>Pesan via WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              {/* Copy Format Button */}
              <button
                type="button"
                onClick={handleCopyMessage}
                disabled={checkedCount === 0}
                className="p-3.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 transition"
                title="Salin Teks Format Pesan"
              >
                {isCopied ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
