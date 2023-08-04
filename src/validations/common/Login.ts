import { z } from 'zod';

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().nonempty('Campo obrigatório').email('E-mail inválido'),
  password: z.string().nonempty('Campo obrigatório'),
});
