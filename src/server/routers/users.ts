import { router, publicProcedure, protectedProcedure } from "@/lib/trpc/trpc";

export const usersRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.users.findMany();
    return data;
  }),
  me: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const user = await ctx.db.query.users.findFirst({
      where: (u, { eq }) => eq(u.id, userId),
    });
    return user;
  }),
});
