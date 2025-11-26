import { z } from "zod";

export const submissionSchema = z.object({
  name: z.string().min(2).trim(),
  email: z.string().email().trim(),
  title: z.string().min(5).trim(),
  track: z.string().trim(),
  authors: z.string().min(3).trim(),
  abstract: z
    .string()
    .transform((val) => {
      // Remove espaços extras no início e fim
      // Normaliza múltiplas quebras de linha para uma única
      // Remove espaços extras no final de linhas
      return val
        .trim()
        .replace(/\n{3,}/g, "\n\n") // Máximo 2 quebras de linha consecutivas
        .replace(/[ \t]+$/gm, "") // Remove espaços no final de cada linha
        .replace(/\r\n/g, "\n"); // Normaliza quebras de linha
    })
    .pipe(z.string().max(2000, "O resumo deve ter no máximo 2000 caracteres")),
  references: z.string().min(20).trim(),
  keywords: z.string().min(3).trim(),
  affiliation: z.string().min(2).trim(),
  degree: z.string().min(2).trim(),
  support: z
    .string()
    .optional()
    .transform((val) => val?.trim() || ""),
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
  panelKeywords: z.string().min(3, "Palavras-chave do painel são obrigatórias"),
  references: z.string().min(20),
  summaries: z
    .array(
      z.object({
        title: z.string().min(5),
        authors: z.string().min(3),
        abstract: z.string().max(2000, "Cada resumo deve ter no máximo 2000 caracteres"),
        keywords: z.string().min(3, "Palavras-chave são obrigatórias"),
        affiliation: z.string().min(2),
        degree: z.string().min(2),
      })
    )
    .min(4, "Mínimo de 4 comunicações")
    .max(6, "Máximo de 6 comunicações"),
});

export type Submission = z.infer<typeof submissionSchema>;
export type PanelSubmission = z.infer<typeof panelSubmissionSchema>;
