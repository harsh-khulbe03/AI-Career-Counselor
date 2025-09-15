import { router, publicProcedure } from "@/lib/trpc/trpc";
import { z } from "zod";

export const messagesRouter = router({
  bySession: publicProcedure
    .input(z.object({ sessionId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.messages.findMany({
        where: (m, { eq }) => eq(m.sessionId, input.sessionId),
      });
    }),
});
