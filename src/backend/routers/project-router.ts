import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../db";

export const projectRouter = trpc
  .router()
  .query("findAll", {
    async resolve() {
      return await prisma.project.findMany({
        include: { client: true }
      });
    }
  })
  .query("findById", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ input }) {
      return await prisma.project.findFirst({
        where: { id: input.id },
        include: { client: true }
      });
    }
  });
