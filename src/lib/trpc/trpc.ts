import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "./context";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ next, ctx }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new Error("Not authenticated");
  }

  const { id } = ctx.session.user;

  const user = await ctx.db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, id),
  });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user,
    },
  });
});
