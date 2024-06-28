import { useRouter } from 'next/router';
import { api } from '~/trpc/react';
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.product.get.query({ id: Number(id) });
          setProduct(response);
        } catch (err) {
          setError('Failed to fetch product details');
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Product <span className="text-[hsl(280,100%,70%)]">Details</span>
      </h1>
      <div className="max-w-md p-4 bg-white/10 rounded-xl">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
        <p className="mt-2 text-lg font-semibold">Price: ${product.price}</p>
        <p className="mt-2 text-sm">Created at: {new Date(product.createdAt).toLocaleDateString()}</p>
        <p className="mt-2 text-sm">Updated at: {new Date(product.updatedAt).toLocaleDateString()}</p>
      </div>
    </main>
  );
}
