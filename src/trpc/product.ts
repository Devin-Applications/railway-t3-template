import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const products = await db.product.findMany();
    return products;
  }),
});
