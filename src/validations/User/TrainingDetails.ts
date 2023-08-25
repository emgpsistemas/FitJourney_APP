import { z } from 'zod';

export type TrainingDetailsFormData = z.infer<typeof trainingDetailsSchema>;

export const exerciseFormSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  observations: z.string().optional(),
  series: z.array(
    z.object({
      isChecked: z.boolean(),
      repetitions: z.object({
        actual: z.number(),
        lastTraining: z.number(),
      }),
      weight: z.object({
        actual: z.number(),
        lastTraining: z.number(),
      }),
    }),
  ),
});

export const trainingDetailsSchema = z.object({
  exercises: z.array(exerciseFormSchema),
});
