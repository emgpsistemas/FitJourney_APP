import { z } from 'zod';

export type TrainingDetailsFormData = z.infer<typeof trainingDetailsSchema>;

export const exerciseFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  observations: z.string().optional(),
  series: z.array(
    z.object({
      isChecked: z.boolean(),
      repetitions: z.object({
        actual: z.string(),
        lastTraining: z.string(),
      }),
      weight: z.object({
        actual: z.string(),
        lastTraining: z.string(),
      }),
    }),
  ),
});

export const trainingDetailsSchema = z.object({
  name: z.string(),
  exercises: z.array(exerciseFormSchema),
});
