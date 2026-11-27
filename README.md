# Mini Product Service V2 (Docker Compose + Bun + TypeScript + MySQL)

Layanan API sederhana berbasis **Bun** dan **TypeScript** yang terhubung ke **MySQL 8.4** menggunakan **Docker Compose** dengan penyimpanan data persisten melalui volume `mysql_data`.

## Arsitektur Layanan
- **app** (`src/index.ts`, port `3000`): Server HTTP Bun yang melayani endpoint `GET /products` dengan mengambil data dari tabel `products` melalui `mysql2/promise` (`DB_HOST=db`).
- **db** (`mysql:8.4`, port `3306`): Database MySQL yang diinisialisasi otomatis oleh `sql/init.sql` dan menyimpan data pada volume `mysql_data:/var/lib/mysql`, dilengkapi `healthcheck` agar `app` menunggu database siap (`service_healthy`).

## Konfigurasi Environment
Salin `.env.example` menjadi `.env` (file `.env` diabaikan oleh `.gitignore` agar kredensial tidak terunggah ke GitHub):
- `DB_HOST=db`
- `DB_PORT=3306`
- `DB_NAME=toko`
- `DB_USER=toko_app`
- `DB_PASSWORD=...`
- `DB_ROOT_PASSWORD=...`
- `APP_PORT=3000`

## Menjalankan & Menguji Layanan
1. Validasi konfigurasi Compose: `docker compose config`
2. Build dan jalankan layanan di latar belakang: `docker compose up -d --build`
3. Cek status container: `docker compose ps`, lalu buka `http://localhost:3000/products` di browser.

## Uji Persistensi Volume
1. Tambah data baru pada tabel `products` di layanan `db`.
2. Hentikan dengan `docker compose down` lalu nyalakan lagi dengan `docker compose up -d` (tanpa `-v`).
3. Cek kembali `http://localhost:3000/products` untuk memastikan data tetap ada di volume `mysql_data`.

## Catatan Debugging
- **RSA Public Key Retrieval pada MySQL 8.4:** Diatasi menggunakan `mysql2/promise` dengan `allowPublicKeyRetrieval: true` serta inisialisasi volume bersih saat dibutuhkan.
- **Tipe `ssl` pada `PoolOptions` (`ts(2769)`):** Properti `ssl` tidak diberi nilai boolean `false` agar sesuai tipe `string | SslOptions | undefined`.
