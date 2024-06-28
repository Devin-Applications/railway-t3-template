import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import type { Product } from "@prisma/client";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const products: Product[] = await db.product.findMany();
    console.log("Fetched products in getAll:", products);
    return products;
  }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const product: Product | null = await db.product.findUnique({
        where: { id: input.id },
      });
      if (!product) {
        throw new Error("Product not found");
      }
      console.log("Fetched product in get:", product);
      return product;
    }),
});
