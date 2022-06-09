import * as trpc from "@trpc/server";
import { clientRouter } from "./routers/client-router";
import { projectRouter } from "./routers/project-router";

export const appRouter = trpc
  .router()
  .merge("projects.", projectRouter)
  .merge("client.", clientRouter);

export type AppRouter = typeof appRouter;
