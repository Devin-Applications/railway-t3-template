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
  const { data: products, error, isLoading } = api.product.getAll.useQuery<Product[]>();

  console.log("Fetched products:", products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch products: {error.message}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Product <span className="text-[hsl(280,100%,70%)]">Listing</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {products?.map((product) => (
            <div
              key={product.id}
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <p className="text-lg">{product.description}</p>
              <Link
                href={`/product/${product.id}`}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
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
