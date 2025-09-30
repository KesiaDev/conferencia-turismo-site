import { z } from "zod";

export const sessionSlotSchema = z.object({
  time: z.string(),
  title: z.string(),
  location: z.string(),
  kind: z.enum(["service", "plenary", "keynote", "sessions", "break", "panel", "networking", "tour"]),
  track: z.string().optional(),
});

export const programDaySchema = z.object({
  day: z.string(),
  slots: z.array(sessionSlotSchema),
});

export type SessionSlot = z.infer<typeof sessionSlotSchema>;
export type ProgramDay = z.infer<typeof programDaySchema>;

