import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  documentNumber: z.string().min(1, "Número do documento é obrigatório"),
  documentType: z.enum(["CPF", "RG", "Passaporte", "CNH"]),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  category: z.enum(["Graduação", "Pós Graduação", "Professores, Pesquisadores ou Profissionais"]),
  affiliation: z.string().min(1, "Afiliação/Instituição é obrigatória"),
  paymentMethod: z.enum(["PIX", "Cartão de Crédito", "Boleto Bancário", "Transferência Bancária"]),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export interface RegistrationWithId extends RegistrationData {
  id: string;
  createdAt: string;
  priceInfo: {
    category: string;
    currentPrice: number;
    period: string;
  };
}
