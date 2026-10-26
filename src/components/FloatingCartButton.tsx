import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

interface FloatingCartButtonProps {
  itemCount: number;
  subtotal: number;
  onClick: () => void;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  itemCount,
  subtotal,
  onClick,
}) => {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 animate-fade-in">
      <button
        onClick={onClick}
        className="group flex items-center gap-3 bg-stone-900 hover:bg-brand text-white pl-4 pr-5 py-3.5 rounded-full shadow-elevated border border-stone-700/50 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 transition-transform group-hover:-rotate-6" />
          <span className="absolute -top-2 -right-2 bg-brand group-hover:bg-white group-hover:text-brand text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-900 shadow">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] text-stone-300 uppercase tracking-wider font-semibold leading-none">
            Keranjang
          </span>
          <span className="text-sm font-bold text-white tracking-tight">
            {formatRupiah(subtotal)}
          </span>
        </div>
      </button>
    </div>
  );
};
