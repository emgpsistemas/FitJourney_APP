import { z } from 'zod';

export type EditExerciseModalFormData = z.infer<typeof editExerciseModalSchema>;

export const editExerciseModalSchema = z.object({
  id: z.number(),
  name: z.string().nonempty('Campo obrigatório'),
  muscle_group: z.string().nonempty('Campo obrigatório'),
  description: z.string().nonempty('Campo obrigatório'),
});
