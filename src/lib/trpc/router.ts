import { router } from "./trpc";
import { usersRouter } from "@/server/routers/users";
import { chatSessionsRouter } from "@/server/routers/chatSessions";
import { messagesRouter } from "@/server/routers/messages";

export const appRouter = router({
  users: usersRouter,
  chatSessions: chatSessionsRouter,
  messages: messagesRouter,
});

export type AppRouter = typeof appRouter;
