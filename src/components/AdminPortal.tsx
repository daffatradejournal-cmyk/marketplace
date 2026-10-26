import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Power, 
  Settings, 
  Package, 
  RotateCcw, 
  ExternalLink,
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';
import { Product, StoreConfig, Category } from '../types';
import { formatRupiah, cleanWhatsAppNumber } from '../utils/formatters';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  config: StoreConfig;
  isAuthenticated: boolean;
  onLogin: (pin: string) => boolean;
  onLogout: () => void;
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'slug'>) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onToggleStock: (id: string) => void;
  onSaveConfig: (config: StoreConfig) => void;
  onResetProducts: () => void;
}

const CATEGORIES: Category[] = [
  'Pakaian',
  'Aksesoris',
  'Sepatu & Sandal',
  'Tas & Dompet',
  'Lifestyle & Rumah',
  'Kopi & Camilan'
];

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  products,
  config,
  isAuthenticated,
  onLogin,
  onLogout,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onToggleStock,
  onSaveConfig,
  onResetProducts,
}) => {
  if (!isOpen) return null;

  // Login form state
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab: 'inventory' | 'config'
  const [activeTab, setActiveTab] = useState<'inventory' | 'config'>('inventory');

  // Search in Admin
  const [adminSearch, setAdminSearch] = useState('');

  // Product Form Modal state (Create / Edit)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pakaian' as Category,
    description: '',
    price: 0,
    discountPrice: 0,
    imageUrl: '',
    variantsString: '',
    isAvailable: true,
  });

  // Config Form state
  const [configForm, setConfigForm] = useState<StoreConfig>({ ...config });
  const [configSaved, setConfigSaved] = useState(false);

  // Delete Confirm Modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(pinInput);
    if (!success) {
      setLoginError('PIN / Password admin salah! (Default: admin123)');
    } else {
      setLoginError('');
      setPinInput('');
    }
  };

  // Open Form for Create
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Pakaian',
      description: '',
      price: 150000,
      discountPrice: 0,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      variantsString: 'Standar',
      isAvailable: true,
    });
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: (p.category as Category) || 'Pakaian',
      description: p.description,
      price: p.price,
      discountPrice: p.discountPrice || 0,
      imageUrl: p.images[0] || '',
      variantsString: p.variants ? p.variants.join(', ') : '',
      isAvailable: p.isAvailable,
    });
    setIsFormOpen(true);
  };

  // Submit Product Create / Edit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const variants = formData.variantsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        discountPrice: formData.discountPrice > 0 ? Number(formData.discountPrice) : undefined,
        images: [formData.imageUrl],
        variants: variants.length > 0 ? variants : undefined,
        isAvailable: formData.isAvailable,
      });
    } else {
      onAddProduct({
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        discountPrice: formData.discountPrice > 0 ? Number(formData.discountPrice) : undefined,
        images: [formData.imageUrl],
        variants: variants.length > 0 ? variants : undefined,
        isAvailable: formData.isAvailable,
      });
    }

    setIsFormOpen(false);
  };

  // Submit Config Form
  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(configForm);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2000);
  };

  // Filtered products for admin list
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-elevated border border-surface-border overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="px-5 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-sm">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">Portal Pengelola Toko</h2>
                <span className="text-[10px] font-semibold bg-stone-800 text-amber-300 px-2 py-0.5 rounded-full border border-stone-700">
                  {isAuthenticated ? 'Sesi Aktif' : 'Terkunci'}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Kelola etalase inventaris, harga barang, dan kontak WhatsApp resmi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition text-xs font-semibold flex items-center gap-1.5"
                title="Keluar Sesi Admin"
              >
                <Power className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 text-brand flex items-center justify-center mb-4 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">
              Masukkan PIN Admin
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Halaman ini khusus untuk pemilik toko untuk menambah produk, mengubah harga, dan konfigurasi pesan.
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Ketik PIN Admin (default: admin123)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand text-center tracking-widest font-mono"
                  autoFocus
                />
                {loginError && (
                  <p className="text-xs text-red-600 mt-2 font-medium">{loginError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-brand text-white font-bold text-sm rounded-xl transition shadow-md"
              >
                Masuk ke Dashboard
              </button>

              <div className="pt-2 text-[11px] text-stone-400">
                Hint untuk tester: password bawaan adalah <code className="bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded font-bold">admin123</code>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 overflow-y-auto flex flex-col">
            
            {/* Admin Navigation Tabs */}
            <div className="flex border-b border-surface-border bg-stone-50 px-5 pt-3 gap-4">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
                  activeTab === 'inventory'
                    ? 'border-brand text-brand'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Katalog Produk ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
                  activeTab === 'config'
                    ? 'border-brand text-brand'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Pengaturan Toko & WhatsApp</span>
              </button>
            </div>

            {/* TAB 1: INVENTORY CRUD */}
            {activeTab === 'inventory' && (
              <div className="p-4 sm:p-6 space-y-4 flex-1">
                {/* Inventory Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <input
                      type="text"
                      placeholder="Cari produk di admin..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onResetProducts}
                      className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-600 text-xs font-semibold flex items-center gap-1.5 transition"
                      title="Kembalikan ke data contoh awal"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Data</span>
                    </button>

                    <button
                      onClick={handleOpenCreate}
                      className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Produk Baru</span>
                    </button>
                  </div>
                </div>

                {/* Products Table (Desktop) / Cards (Mobile) */}
                <div className="bg-white rounded-2xl border border-surface-border overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-stone-50 border-b border-surface-border text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-4">Produk</th>
                          <th className="py-3 px-4">Kategori</th>
                          <th className="py-3 px-4">Harga Normal</th>
                          <th className="py-3 px-4">Harga Promo</th>
                          <th className="py-3 px-4 text-center">Status Stok</th>
                          <th className="py-3 px-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-stone-50/80 transition">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                                  <img
                                    src={p.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80'}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0 max-w-xs">
                                  <p className="font-bold text-stone-900 truncate">{p.name}</p>
                                  <p className="text-[10px] text-stone-400">
                                    {p.variants?.length ? `${p.variants.length} varian` : 'Tanpa varian'}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-4 text-stone-600 font-medium">
                              <span className="bg-stone-100 px-2 py-0.5 rounded text-[10px]">
                                {p.category}
                              </span>
                            </td>

                            <td className="py-3 px-4 font-semibold text-stone-800">
                              {formatRupiah(p.price)}
                            </td>

                            <td className="py-3 px-4 font-bold text-brand">
                              {p.discountPrice && p.discountPrice > 0 ? formatRupiah(p.discountPrice) : '-'}
                            </td>

                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => onToggleStock(p.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition shadow-xs ${
                                  p.isAvailable
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                                }`}
                                title="Klik untuk mengubah status stok"
                              >
                                {p.isAvailable ? 'Tersedia' : 'Habis'}
                              </button>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEdit(p)}
                                  className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
                                  title="Edit Produk"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setProductToDelete(p)}
                                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                                  title="Hapus Produk"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: STORE & WHATSAPP CONFIG */}
            {activeTab === 'config' && (
              <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-6">
                <form onSubmit={handleConfigSubmit} className="bg-white rounded-2xl p-6 border border-surface-border shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">
                    Pengaturan Identitas & Nomor WhatsApp
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nama Toko
                    </label>
                    <input
                      type="text"
                      value={configForm.storeName}
                      onChange={(e) => setConfigForm({ ...configForm, storeName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Tagline / Deskripsi Singkat Toko
                    </label>
                    <input
                      type="text"
                      value={configForm.storeTagline}
                      onChange={(e) => setConfigForm({ ...configForm, storeTagline: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nomor WhatsApp Penjual (Otomatis Awalan 62)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Contoh: 6281234567890 atau 081234567890"
                        value={configForm.whatsappNumber}
                        onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand font-mono font-bold"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Nomor bersih yang akan digunakan: <span className="font-mono text-stone-700 font-bold">+{cleanWhatsAppNumber(configForm.whatsappNumber)}</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Teks Salam Pembuka WhatsApp
                    </label>
                    <textarea
                      rows={2}
                      value={configForm.greetingMessage}
                      onChange={(e) => setConfigForm({ ...configForm, greetingMessage: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Teks Penutup Pesan WhatsApp
                    </label>
                    <textarea
                      rows={2}
                      value={configForm.footerMessage}
                      onChange={(e) => setConfigForm({ ...configForm, footerMessage: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ganti Password / PIN Admin
                    </label>
                    <input
                      type="text"
                      value={configForm.adminPin}
                      onChange={(e) => setConfigForm({ ...configForm, adminPin: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand font-mono"
                      required
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-stone-100">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-stone-900 hover:bg-brand text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                    >
                      {configSaved ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Tersimpan!</span>
                        </>
                      ) : (
                        <span>Simpan Perubahan</span>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/${cleanWhatsAppNumber(configForm.whatsappNumber)}?text=Halo%20Test%20Katalog`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-brand hover:underline flex items-center gap-1 font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Uji Buka WhatsApp</span>
                    </a>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

      </div>

      {/* MODAL: CREATE / EDIT PRODUCT */}
      {isFormOpen && (
        <div className="fixed inset-0 z-60 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-stone-200 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-bold text-sm text-stone-900">
                {editingProduct ? 'Edit Informasi Produk' : 'Tambah Produk Baru'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Kemeja Linen Lengan Pendek"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status Stok</label>
                  <select
                    value={formData.isAvailable ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value === 'true' })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand"
                  >
                    <option value="true">Tersedia (Ready Stock)</option>
                    <option value="false">Habis (Out of Stock)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Harga Normal (Rp)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={1000}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Harga Promo (Rp, Opsional)</label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">URL Gambar Produk</label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Pilihan Varian (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formData.variantsString}
                  onChange={(e) => setFormData({ ...formData, variantsString: e.target.value })}
                  placeholder="Contoh: Ukuran S, Ukuran M, Ukuran L, Ukuran XL"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan spesifikasi, bahan, dan keunggulan barang..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-brand resize-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold"
                >
                  {editingProduct ? 'Perbarui Produk' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {productToDelete && (
        <div className="fixed inset-0 z-60 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-stone-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-stone-900 mb-1">Hapus Produk Ini?</h4>
            <p className="text-xs text-stone-500 mb-5">
              Apakah Anda yakin ingin menghapus <strong className="text-stone-800">"{productToDelete.name}"</strong> dari etalase toko?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onDeleteProduct(productToDelete.id);
                  setProductToDelete(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
