# Mini Product Service (Bun + TypeScript + Docker)

Service HTTP sederhana menggunakan Bun dan TypeScript yang melayani daftar produk pada endpoint /products, lalu dikemas menggunakan Docker.

## Struktur Project
- index.ts - kode server Bun + TypeScript (Bun.serve pada port 3000)
- package.json & bun.lock - konfigurasi project dan lockfile dependensi
- Dockerfile - instruksi build image berbasis oven/bun:1
- .dockerignore - daftar file/folder yang dikecualikan saat build Docker image

## Cara Menjalankan Secara Lokal (Bun)
Perintah: bun run index.ts
Buka http://localhost:3000/products di browser.

## Cara Menjalankan dengan Docker
Perintah build: docker build -t mini-product-service .
Perintah run: docker run -d --name mini-product -p 3000:3000 mini-product-service
Buka http://localhost:3000/products di browser.

## Pemeriksaan Status, Port & Log
- docker ps
- docker ps -a
- docker logs mini-product

## Ringkasan Bug Hunt
1. Bug Hunt #1 (Container langsung berhenti): Diperiksa melalui docker ps -a dan docker logs untuk membaca pesan error sebelum mengubah kode.
2. Bug Hunt #2 (Beda port mapping): Menjalankan container dengan -p 8080:3000 sehingga diakses melalui http://localhost:8080/products.
3. Bug Hunt #3 (Kode berubah, hasil masih lama): Image lama tidak otomatis berubah saat index.ts diedit; perlu docker stop, docker rm, docker build -t mini-product-service ., dan docker run ulang.
