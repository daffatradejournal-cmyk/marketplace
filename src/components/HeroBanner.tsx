import React from 'react';
import { Sparkles, MessageCircle, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { StoreConfig } from '../types';

interface HeroBannerProps {
  config: StoreConfig;
  totalProducts: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ config, totalProducts }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-4 sm:pt-10 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl bg-stone-900 text-stone-100 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-card">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          {/* Decorative Warm Accent Glow (Non-slop, subtle natural ember) */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700/80 text-brand-300 text-xs font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Etalase Langsung Toko Mandiri</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3">
              Pilih Barang Favorit, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-amber-200">
                Pesan Instan via WhatsApp.
              </span>
            </h2>

            {/* Description */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              Jelajahi {totalProducts} koleksi produk pilihan kami. Gunakan fitur centang di keranjang untuk menentukan barang yang ingin dipesan hari ini, draf pesan WhatsApp akan terformat rapi secara otomatis.
            </p>

            {/* Features / Guarantees Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-800">
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Tanpa Login Akun</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>0% Biaya Admin</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-300 col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Format Pesan Rapi</span>
              </div>
            </div>

          </div>

          {/* Quick WhatsApp Badge (Desktop) */}
          <div className="hidden lg:flex absolute right-12 bottom-12 items-center gap-3 bg-stone-800/80 border border-stone-700 p-4 rounded-2xl backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-stone-400 font-medium">WhatsApp Penjual</p>
              <p className="text-sm font-bold text-white tracking-wide">+{config.whatsappNumber}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
