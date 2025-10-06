import { z } from "zod";

export const submissionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  title: z.string().min(5),
  track: z.string(),
  authors: z.string().min(3),
  abstract: z.string().max(2000, "O resumo deve ter no máximo 2000 caracteres"),
  references: z.string().min(20),
  keywords: z.string().min(3),
  affiliation: z.string().min(2),
  degree: z.string().min(2),
  support: z.string().optional(),
  language: z.enum(["pt", "en", "es"]),
});

export const panelSubmissionSchema = z.object({
  coordinatorName: z.string().min(2),
  coordinatorEmail: z.string().email(),
  panelTitle: z.string().min(5),
  track: z.string(),
  language: z.enum(["pt", "en", "es"]),
  panelAbstract: z
    .string()
    .max(
      2000,
      "O resumo do painel deve ter no máximo 2000 caracteres (aproximadamente 300 palavras)"
    ),
  references: z.string().min(20),
  summaries: z
    .array(
      z.object({
        title: z.string().min(5),
        authors: z.string().min(3),
        abstract: z.string().max(2000, "Cada resumo deve ter no máximo 2000 caracteres"),
        affiliation: z.string().min(2),
        degree: z.string().min(2),
      })
    )
    .min(4, "Mínimo de 4 comunicações")
    .max(6, "Máximo de 6 comunicações"),
});

export type Submission = z.infer<typeof submissionSchema>;
export type PanelSubmission = z.infer<typeof panelSubmissionSchema>;
