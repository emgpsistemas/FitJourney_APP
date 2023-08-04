import { z } from 'zod';

export type PasswordRecoveryFormData = z.infer<typeof passwordRecoverySchema>;

export const passwordRecoverySchema = z.object({
  email: z.string().nonempty('Campo obrigatório').email('E-mail inválido'),
});
