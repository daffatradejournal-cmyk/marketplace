import { CartItem, CustomerData, StoreConfig } from '../types';

export function formatRupiah(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rp 0';
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export function calculateDiscountPercentage(normalPrice: number, discountPrice?: number): number {
  if (!discountPrice || discountPrice >= normalPrice) return 0;
  return Math.round(((normalPrice - discountPrice) / normalPrice) * 100);
}

export function cleanWhatsAppNumber(number: string): string {
  let cleaned = number.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

export function generateWhatsAppMessage(
  config: StoreConfig,
  items: CartItem[],
  customer: CustomerData
): string {
  const checkedItems = items.filter((item) => item.isChecked);
  const total = checkedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const greeting = config.greetingMessage?.trim() || 
    'Halo Admin, saya ingin memesan barang dari katalog website dengan rincian berikut:';

  let itemsText = '';
  checkedItems.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    const variantLine = item.variant ? item.variant : 'Default';
    itemsText += `${index + 1}. ${item.name.toUpperCase()}\n   - Varian: ${variantLine}\n   - Jumlah: ${item.quantity} pcs\n   - Harga: ${formatRupiah(item.price)} (Subtotal: ${formatRupiah(itemSubtotal)})\n\n`;
  });

  const footer = config.footerMessage?.trim() || 
    'Mohon konfirmasi ketersediaan stok serta informasi total biaya dan nomor rekening pembayarannya. Terima kasih!';

  const message = `${greeting}

==============================
RINCIAN PESANAN:
==============================
${itemsText.trim()}

==============================
TOTAL ESTIMASI: ${formatRupiah(total)}
(Belum termasuk ongkos kirim)
==============================

DATA PEMESAN:
- Nama: ${customer.name.trim() || '-'}
- Alamat/Wilayah: ${customer.address.trim() || '-'}
- Catatan: ${customer.notes.trim() || '-'}

${footer}`;

  return message;
}

export function buildWhatsAppUrl(
  config: StoreConfig,
  items: CartItem[],
  customer: CustomerData
): string {
  const phone = cleanWhatsAppNumber(config.whatsappNumber);
  const message = generateWhatsAppMessage(config, items, customer);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
