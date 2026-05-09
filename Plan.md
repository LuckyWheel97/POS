# 📋 Plan: Web Point of Sale (POS) untuk Toko ATK & Percetakan

## 1️⃣ Overview Proyek

| Aspek | Detail |
|-------|--------|
| **Nama Aplikasi** | POS ATK PrintShop |
| **Tujuan** | Sistem kasir digital untuk transaksi penjualan ATK dan jasa percetakan |
| **Target Pengguna** | Kasir, Admin, Owner |
| **Platform** | Web Browser (Responsive) |

---

## 2️⃣ Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│              Next.js + React                        │
│         Vercel Deployment                          │
├─────────────────────────────────────────────────────┤
│                   BACKEND                           │
│            Supabase (PostgreSQL)                    │
│    Authentication, Database, Storage                │
└─────────────────────────────────────────────────────┘
```

### Tools & Libraries:

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State Management | Zustand / React Context |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Realtime | Supabase Realtime |
| Deployment Frontend | Vercel |

---

## 3️⃣ Database Schema (Supabase)

### Tabel Utama:

```sql
-- 📦 Produk ATK & Jasa Percetakan
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- 'ATK', 'Percetakan', 'Lainnya'
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  unit VARCHAR(50), -- 'pcs', 'lembar', 'kg'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 🧾 Transaksi Penjualan
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255),
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50), -- 'Tunai', 'Transfer', 'Kartu'
  status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 📝 Item dalam Transaksi (Line Items)
CREATE TABLE transaction_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES transactions(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 👤 User (Kasir & Admin)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50), -- 'admin', 'cashier'
  full_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 📊 Laporan Penjualan Harian/Bulanan
CREATE TABLE sales_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  total_transactions INTEGER DEFAULT 0,
  total_amount DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 🖼️ Gambar/Preview Dokumen Percetakan
CREATE TABLE print_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES transactions(id),
  file_url TEXT NOT NULL,
  file_type VARCHAR(100), -- 'pdf', 'docx'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'printing', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4️⃣ Struktur Frontend (Next.js)

```
src/
├── app/
│   ├── layout.tsx          # Layout utama dengan navbar/footer
│   ├── page.tsx            # Landing/Home Page
│   ├── login/
│   │   └── page.tsx        # Halaman Login Kasir/Admin
│   ├── pos/
│   │   ├── page.tsx        # Halaman POS (Kasir) - UTAMA
│   │   ├── products/       # Katalog Produk
│   │   └── orders/         # Riwayat Pesanan
│   ├── admin/
│   │   ├── dashboard/      # Dashboard Admin
│   │   ├── products/       # Manajemen Produk (CRUD)
│   │   ├── users/          # Manajemen User
│   │   └── reports/        # Laporan Penjualan
│   └── api/                # API Routes (jika perlu custom logic)
├── components/
│   ├── ui/                 # Komponen shadcn/ui
│   ├── pos/
│   │   ├── ProductCard.tsx
│   │   ├── Cart.tsx
│   │   └── CheckoutForm.tsx
│   ├── admin/
│   │   ├── ProductTable.tsx
│   │   └── ReportChart.tsx
│   └── common/             # Komponen umum (Navbar, Modal, dll)
├── lib/
│   ├── supabase.ts         # Supabase Client Config
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Konstanta aplikasi
├── hooks/                  # Custom React Hooks
└── types/                  # TypeScript Types
```

---

## 5️⃣ Fitur Utama POS

### 🛒 Halaman Kasir (POS)

| Fitur | Deskripsi |
|-------|-----------|
| **Product Search** | Cari produk dengan keyword |
| **Category Filter** | Filter: ATK / Percetakan |
| **Add to Cart** | Tambah item ke keranjang belanja |
| **Quantity Adjust** | +/- jumlah barang |
| **Discount Input** | Input diskon manual (opsional) |
| **Payment Method** | Pilih metode pembayaran |
| **Print Receipt** | Cetak struk transaksi |

### 📊 Halaman Admin

| Fitur | Deskripsi |
|-------|-----------|
| **Dashboard** | Ringkasan penjualan hari ini/bulan ini |
| **Product Management** | CRUD produk ATK & jasa percetakan |
| **Stock Tracking** | Pantau stok barang |
| **User Management** | Tambah/hapus user kasir |
| **Sales Reports** | Grafik & tabel laporan penjualan |

### 🔐 Authentication

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Login     │────▶│  Supabase    │────▶│ Auth Token  │
│   Page      │◀────│   Auth       │◀────│ Session     │
└─────────────┘     └──────────────┘     └─────────────┘
```

---

## 6️⃣ API Endpoints (Supabase)

### Authentication:
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/auth/signup` | Daftar user baru |
| POST | `/auth/login` | Login dengan email/password |
| GET | `/auth/me` | Get current session |

### Products:
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/products` | List semua produk |
| GET | `/products/:id` | Detail satu produk |
| POST | `/products` | Tambah produk baru |
| PUT | `/products/:id` | Update produk |
| DELETE | `/products/:id` | Hapus produk |

### Transactions:
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/transactions` | List transaksi (dengan filter) |
| POST | `/transactions` | Buat transaksi baru |
| GET | `/transactions/:id` | Detail transaksi |
| PUT | `/transactions/:id` | Update status transaksi |

### Reports:
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/reports/daily` | Laporan penjualan harian |
| GET | `/reports/monthly` | Laporan penjualan bulanan |

---

## 7️⃣ Alur Kerja (User Flow)

### 📝 Transaksi Penjualan:

```
1. Kasir Login → Verifikasi Session
2. Buka Halaman POS → Pilih Kategori
3. Cari Produk → Tambah ke Cart
4. Sesuaikan Quantity → Hitung Total
5. Input Pembayaran → Proses Checkout
6. Simpan Transaksi → Update Stok
7. Cetak Struk / Kirim Email (opsional)
```

### 🖨️ Jasa Percetakan:

```
1. Kasir Pilih "Jasa Percetakan"
2. Upload File Dokumen (PDF/DOCX)
3. Input Detail: Jumlah Lembar, Ukuran, Warna
4. Hitung Harga Otomatis
5. Simpan Pesanan → Status "Pending"
6. Admin Update Status ke "Printing" / "Completed"
7. Customer Notifikasi Selesai
```

---

## 8️⃣ Deployment Checklist

### 🚀 Frontend (Vercel):

```bash
# 1. Install dependencies
npm install

# 2. Setup .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# 3. Build & Deploy
vercel deploy --prod
```

### 🗄️ Backend (Supabase):

```bash
# 1. Buat project di supabase.com
# 2. Generate API Keys
# 3. Jalankan SQL Schema (via SQL Editor)
# 4. Setup Row Level Security (RLS) Policies
```

---

## 9️⃣ Timeline Estimasi (untuk Junior Developer)

| Minggu | Fokus | Deliverables |
|--------|-------|--------------|
| **1** | Setup & Database | Supabase project, Schema, Auth dasar |
| **2** | Frontend Core | Next.js setup, Login page, POS layout |
| **3** | Product Management | CRUD produk, Search, Filter |
| **4** | Transaction Flow | Cart, Checkout, Struk |
| **5** | Admin Dashboard | Laporan, Grafik, User management |
| **6** | Testing & Polish | Bug fix, UI polish, Deployment |

---

## 🔟 Tips untuk Developer Junior

```
✅ PENTING:
1. Mulai dari yang SIMPLE dulu (MVP)
2. Gunakan Supabase Dashboard untuk test database
3. Dokumentasi setiap fitur yang dibuat
4. Test di browser mobile juga!
5. Backup data sebelum deploy production

💡 REKOMENDASI:
- Pelajari Next.js App Router
- Pahami konsep REST API / RPC (Supabase)
- Tailwind CSS sangat membantu untuk styling cepat
- Gunakan Vercel Analytics untuk monitoring
```

---

## 📚 Resources

| Sumber | Link |
|--------|------|
| Supabase Docs | https://supabase.com/docs |
| Next.js Guide | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com |
| shadcn/ui | https://ui.shadcn.com |
| Vercel Deploy | https://vercel.com/docs |

---

**🎯 Good Luck! Semangat membangun aplikasinya!** 🚀