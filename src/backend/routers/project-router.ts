import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../db";
import {
  projectEnum,
  projectSchema,
  updateProjectSchema
} from "@/shared/project-schema";

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
    input: updateProjectSchema,
    async resolve({ input }) {
      return await prisma.project.update({
        where: { id: input.id },
        data: {
          name: input.name || undefined,
          description: input.description || undefined,
          status: input.status || undefined
        }
      });
    }
  });
