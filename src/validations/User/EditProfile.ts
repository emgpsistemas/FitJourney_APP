import { z } from 'zod';

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export const editProfileSchema = z.object({
  displayName: z.string().nonempty('Campo obrigatório'),
  age: z.string().nonempty('Campo obrigatório'),
  weight: z.string().nonempty('Campo obrigatório'),
  height: z.string().nonempty('Campo obrigatório'),
  gender: z
    .string()
    .nonempty('Campo obrigatório')
    .refine((value) => value !== 'Selecione', {
      message: 'Campo obrigatório',
    }),
  goal: z
    .string()
    .nonempty('Campo obrigatório')
    .refine((value) => value !== 'Selecione', {
      message: 'Campo obrigatório',
    }),
  fitnessLevel: z
    .string()
    .nonempty('Campo obrigatório')
    .refine((value) => value !== 'Selecione', {
      message: 'Campo obrigatório',
    }),
  observations: z.string().optional(),
});
