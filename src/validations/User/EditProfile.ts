import { z } from 'zod';

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export const editProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.string(),
  weight: z.string(),
  height: z.string(),
  gender: z.string().min(1).max(1),
  objective: z.string().min(1).max(1),
  activityLevel: z.string().min(1).max(1),
  observations: z.string().optional(),
});
