import { z } from 'zod';

export type EditExerciseModalFormData = z.infer<typeof editExerciseModalSchema>;

export const editExerciseModalSchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  category: z.string().nonempty('Campo obrigatório'),
  description: z.string().nonempty('Campo obrigatório'),
});
