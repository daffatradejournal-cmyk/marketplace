import React from 'react';
import { StoreConfig } from '../types';
import { MessageCircle, ShieldCheck, Heart, Lock } from 'lucide-react';
import { cleanWhatsAppNumber } from '../utils/formatters';

interface FooterProps {
  config: StoreConfig;
  onOpenAdmin: () => void;
  isAdmin: boolean;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin, isAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-16 pt-12 pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-stone-800">
          
          {/* Col 1: Store Intro */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center font-bold text-sm">
                {config.storeName.slice(0, 2).toUpperCase() || 'KG'}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {config.storeName}
              </h3>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {config.storeTagline}. Seluruh transaksi diverifikasi langsung dengan pemilik toko melalui aplikasi WhatsApp resmi tanpa perantara.
            </p>
          </div>

          {/* Col 2: Direct Ordering Advantages */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Keuntungan Pesan Langsung
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Bebas biaya admin & komisi marketplace</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Konsultasi varian & custom request via chat</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-400" />
                <span>Mendukung langsung bisnis lokal & mandiri</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Management */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Kontak & Pengelola
            </h4>
            <p className="text-xs text-stone-400">
              WhatsApp Resmi: <br />
              <a 
                href={`https://wa.me/${cleanWhatsAppNumber(config.whatsappNumber)}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-emerald-400 hover:underline inline-block mt-0.5"
              >
                +{cleanWhatsAppNumber(config.whatsappNumber)}
              </a>
            </p>

            <div className="pt-1">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition py-1 px-2.5 rounded-lg border border-stone-800 hover:border-stone-700 bg-stone-950/40"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAdmin ? 'Masuk ke Dashboard Toko' : 'Login Pemilik Toko (Admin)'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} {config.storeName}. Semua hak dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Dirancang dengan</span>
            <span className="text-brand">♥</span>
            <span>untuk Pengrajin & Penjual Mandiri Indonesia</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
