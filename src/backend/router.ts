import * as trpc from "@trpc/server";
import { clientRouter } from "./routers/client-router";
import { projectRouter } from "./routers/project-router";

export const appRouter = trpc
  .router()
  .merge("projects.", projectRouter)
  .merge("clients.", clientRouter);

export type AppRouter = typeof appRouter;
