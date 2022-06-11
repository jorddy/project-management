import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../db";
import { projectEnum, projectSchema } from "@/shared/project-schema";

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
  })
  .mutation("create", {
    input: projectSchema,
    async resolve({ input }) {
      return await prisma.project.create({ data: input });
    }
  })
  .mutation("delete", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ input }) {
      return await prisma.project.delete({
        where: { id: input.id }
      });
    }
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
      status: projectEnum.optional(),
      client: z
        .object({
          connect: z.object({ id: z.string() })
        })
        .optional()
    }),
    async resolve({ input }) {
      return await prisma.project.upsert({
        where: { id: input.id },
        update: input,
        create: {
          name: input.name!,
          description: input.description!,
          status: input.status!,
          client: input.client!
        }
      });
    }
  });
