import { z } from 'zod';

export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;

export const userRegisterSchema = z
  .object({
    email: z.string().nonempty('Campo obrigatório').email('E-mail inválido'),
    password: z
      .string()
      .nonempty('Campo obrigatório')
      .min(6, 'A senha deve conter no mínimo 6 caracteres'),
    confirmPassword: z.string().nonempty('Campo obrigatório'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
