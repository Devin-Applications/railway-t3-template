import Link from "next/link";
import { api } from "~/trpc/react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function ProductListing() {
  const { data, error, isLoading } = api.product.getAll.useQuery<Product[]>();

  console.log("Fetched data:", data);

  const products: Product[] = Array.isArray(data) ? data : [];

  console.log("Fetched products:", products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch products: {error.message}</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Product <span className="text-[hsl(280,100%,70%)]">Listing</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="product-card"
            >
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price.toFixed(2)}</p>
              <Link
                href={`/product/${product.id}`}
                className="product-link"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
