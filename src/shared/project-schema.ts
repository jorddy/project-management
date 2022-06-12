import { z } from "zod";

export const projectEnum = z
  .enum(["Not Started", "In Progress", "Completed"])
  .default("Not Started");

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: projectEnum,
  client: z.object({
    connect: z.object({ id: z.string() })
  })
});

export type ProjectSchema = z.infer<typeof projectSchema>;

export const updateProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: projectEnum.optional(),
  client: z
    .object({
      connect: z.object({ id: z.string() })
    })
    .optional()
});

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
