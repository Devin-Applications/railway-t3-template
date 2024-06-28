import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import type { Product } from "@prisma/client";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const products: Product[] = await db.product.findMany();
    return products;
  }),
});
