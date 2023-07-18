import { z } from 'zod';

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export const editProfileSchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  email: z.string().nonempty('Campo obrigatório').email('E-mail inválido'),
  age: z.string().nonempty('Campo obrigatório'),
  weight: z.string().nonempty('Campo obrigatório'),
  height: z.string().nonempty('Campo obrigatório'),
  gender: z.string().nonempty('Campo obrigatório'),
  objective: z.string().nonempty('Campo obrigatório'),
  activityLevel: z.string().nonempty('Campo obrigatório'),
  observations: z.string().optional(),
});
