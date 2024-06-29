import { useRouter } from 'next/router';
import { api } from '~/trpc/react';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: product, error, isLoading } = api.product.get.useQuery(
    { id: Number(id) },
    {
      enabled: !!id,
      queryKey: ['product.get', { id: Number(id) }],
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to fetch product details: {error.message}</div>;
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Product <span className="text-[hsl(280,100%,70%)]">Details</span>
      </h1>
      <div className="product-details-container">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-timestamp">Created at: {new Date(product.createdAt).toLocaleDateString()}</p>
        <p className="product-timestamp">Updated at: {new Date(product.updatedAt).toLocaleDateString()}</p>
      </div>
    </main>
  );
}
