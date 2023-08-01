import { z } from 'zod';

export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;

export const userRegisterSchema = z.object({
  email: z.string().nonempty('Campo obrigatório').email('E-mail inválido'),
  password: z.string().nonempty('Campo obrigatório'),
  confirmPassword: z.string().nonempty('Campo obrigatório'),
});
