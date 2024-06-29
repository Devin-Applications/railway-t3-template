import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { productRouter } from "~/trpc/product";
import { authRouter } from "~/server/api/routers/auth";
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = createTRPCRouter({
  post: postRouter,
  product: productRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
