import { z } from 'zod';

export type NewExerciseFormData = z.infer<typeof newExerciseFormSchema>;

export const newExerciseFormSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(100).nonempty('Campo obrigatório'),
  description: z.string().min(3).max(800).nonempty('Campo obrigatório'),
  muscle_group: z.string().min(3).max(100).nonempty('Campo obrigatório'),
});
