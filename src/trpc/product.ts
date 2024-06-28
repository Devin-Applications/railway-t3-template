import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import * as Prisma from "@prisma/client";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const products: Prisma.Product[] = await db.product.findMany();
    return products;
  }),
});
