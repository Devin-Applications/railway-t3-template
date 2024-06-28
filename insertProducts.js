import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const product1 = await prisma.product.create({
    data: {
      name: 'Sample Product 1',
      description: 'This is a sample product description for product 1.',
      price: 19.99
    },
  });
  console.log('Created product:', product1);

  const product2 = await prisma.product.create({
    data: {
      name: 'Sample Product 2',
      description: 'This is a sample product description for product 2.',
      price: 29.99
    },
  });
  console.log('Created product:', product2);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(() => {
    prisma.$disconnect().catch(e => {
      console.error('Error during disconnection:', e);
    });
  });
