import { z } from "zod";

export const feeWindowSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const feeCategorySchema = z.object({
  category: z.string(),
  windows: z.array(feeWindowSchema),
});

export type FeeWindow = z.infer<typeof feeWindowSchema>;
export type FeeCategory = z.infer<typeof feeCategorySchema>;

