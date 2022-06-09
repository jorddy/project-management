import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../db";

export const clientRouter = trpc
  .router()
  .query("findAll", {
    async resolve() {
      return await prisma.client.findMany();
    }
  })
  .query("findById", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ input }) {
      return await prisma.client.findFirst({
        where: { id: input.id }
      });
    }
  });
