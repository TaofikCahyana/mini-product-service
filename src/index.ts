import { createPool } from "mysql2/promise";

const pool = createPool({
  host: process.env.DB_HOST ?? "db",
  port: Number(process.env.DB_PORT ?? 3306),
  database: process.env.DB_NAME ?? "toko",
  user: process.env.DB_USER ?? "toko_app",
  password: process.env.DB_PASSWORD ?? "",
  waitForConnections: true,
  connectionLimit: 10,
  allowPublicKeyRetrieval: true,
});

const appPort = Number(process.env.APP_PORT ?? 3000);

Bun.serve({
  hostname: "0.0.0.0",
  port: appPort,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/products") {
      try {
        const [rows] = await pool.query(
          "SELECT id, name, price FROM products ORDER BY id"
        );
        return Response.json(rows);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Database query error:", message);
        return Response.json(
          { error: "Gagal mengambil data produk dari database", detail: message },
          { status: 500 }
        );
      }
    }

    return new Response("Mini Product Service V2 (Bun + MySQL)");
  },
});

console.log(`Server running on http://0.0.0.0:${appPort}`);
