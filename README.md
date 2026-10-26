# marketplace

> **Katalog Digital Interaktif & Sistem Pemesanan WhatsApp (Single-Seller E-Commerce)**  
> Dibangun dengan arsitektur anti-slop frontend menggunakan standar **Taste Skill v2** (`design-taste-frontend`), React, Tailwind CSS, dan Lucide Icons.

---

## 🌟 Fitur Utama

- **Zero Friction Browsing**: Pelanggan dapat menjelajahi etalase dan harga tanpa kewajiban registrasi atau login akun.
- **Responsive Product Grid**: Tampilan 2 kolom di mobile dan 3–4 kolom di desktop dengan badge diskon (`HEMAT X%`) dan status ketersediaan stok (`Tersedia` / `Habis`).
- **Live Search & Category Filter**: Pencarian instan berdasarkan nama atau deskripsi barang dan filter horizontal berbasis kategori.
- **Detail Modal & Variant Selection**: Galeri gambar, pilihan varian (ukuran/warna), serta penghitung jumlah barang.
- **Checklist Cart Management**:
  - Checkbox per item untuk memilih barang yang ingin dipesan.
  - Tombol master **"Pilih Semua"** dengan kalkulator jumlah barang.
  - **Dynamic Subtotal**: Hanya barang yang terceklis yang dihitung dalam total estimasi.
  - Form data pemesan (Nama, Alamat/Kota, Catatan).
- **Direct WhatsApp Conversion**: Generator draf pesan otomatis dengan format rapi dan terstruktur siap kirim langsung ke nomor WhatsApp resmi penjual (`+6283197516720`).
- **Admin Management Portal** (PIN Default: `admin123`):
  - Autentikasi sesi tertutup.
  - Manajemen Inventaris Lengkap (Tambah, Edit, Hapus, dan Toggle Ketersediaan Stok).
  - Konfigurasi Nama Toko, Tagline, dan Nomor WhatsApp Penjual.
  - Fitur Reset Data Contoh ke kondisi awal.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Design Guidelines**: Taste Skill v2 (`design-taste-frontend`)
- **Interactions**: Canvas Confetti
- **State & Storage**: LocalStorage dengan Event Synchronization

---

## 🚀 Cara Menjalankan Proyek

1. **Clone repository:**
   ```bash
   git clone https://github.com/daffatradejournal-cmyk/web-jualan-kaya-shopee.git
   cd web-jualan-kaya-shopee
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` pada browser Anda.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

## 👤 Pengelola Toko
- **WhatsApp Toko**: [083197516720](https://wa.me/6283197516720)
- **Login Admin**: Akses tombol **Admin** di header atau footer (PIN bawaan: `admin123`).
