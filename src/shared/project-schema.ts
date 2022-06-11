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
