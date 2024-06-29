import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const authRouter = createTRPCRouter({
  getSession: protectedProcedure.query(async ({ ctx }) => {
    const session = await getServerAuthSession();
    return session;
  }),
});
