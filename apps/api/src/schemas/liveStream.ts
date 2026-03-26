import { z } from "zod";

export const liveStreamBodySchema = z.object({
  title: z.string().trim().min(1, "Título obrigatório.").max(500),
  youtubeUrl: z.string().trim().min(1, "Link do YouTube obrigatório.").max(2000),
});
