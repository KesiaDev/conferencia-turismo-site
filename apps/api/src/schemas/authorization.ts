import { z } from "zod";

const stripUnsafe = (s: string) => s.replace(/\0/g, "").trim();

export const authorizationBodySchema = z.object({
  name: z.string().transform(stripUnsafe).pipe(z.string().min(2, "Nome muito curto").max(200)),
  document: z
    .string()
    .transform(stripUnsafe)
    .pipe(z.string().min(3, "Documento obrigatório").max(80)),
  email: z
    .string()
    .transform((s) => stripUnsafe(s).toLowerCase())
    .pipe(z.string().email("E-mail inválido").max(255)),
  summary: z
    .string()
    .transform(stripUnsafe)
    .pipe(z.string().min(3, "Título do resumo obrigatório").max(500)),
  accepted: z.boolean().refine((v) => v === true, { message: "É necessário aceitar os termos" }),
});

export type AuthorizationBody = z.infer<typeof authorizationBodySchema>;
