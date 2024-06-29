import "server-only";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "~/server/api/root";
import { createTRPCContextWithSession } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContextWithSession` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  const context = await createTRPCContextWithSession({
    headers: heads,
  });

  return context;
});

export const createApi = async () => {
  const context = await createContext();
  return createCaller({
    ...context,
    session: context.session, // Ensure the session type matches the expected type
  });
};
