import { router, publicProcedure } from "@/lib/trpc/trpc";
import { z } from "zod";

export const chatSessionsRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.chatSessions.findMany();
  }),
  byUserId: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.chatSessions.findMany({
        where: (c, { eq }) => eq(c.userId, input.userId),
      });
    }),
});
