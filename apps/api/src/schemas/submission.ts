import { z } from "zod";

export const submissionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  title: z.string().min(5),
  track: z.string(),
  abstract: z.string().min(100),
});

export type Submission = z.infer<typeof submissionSchema>;
