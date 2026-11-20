type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Keyboard", price: 150000 },
  { id: 2, name: "Mouse", price: 75000 },
  { id: 3, name: "Monitor", price: 1200000 },
];

Bun.serve({
  hostname: "0.0.0.0",
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/products") {
      return Response.json(products);
    }
    return new Response("Mini Product Service");
  },
});
