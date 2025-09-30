import { z } from "zod";

export const speakerSchema = z.object({
  id: z.string(),
  name: z.string(),
  affiliation: z.string(),
  bio: z.string().optional(),
  tags: z.array(z.string()),
  photo: z.string(),
});

export type Speaker = z.infer<typeof speakerSchema>;

