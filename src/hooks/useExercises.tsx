import { useContext } from 'react';
import { ExercisesContext } from '../contexts/Exercises';

export function useExercises() {
  const context = useContext(ExercisesContext);

  if (!context) {
    throw new Error('useExercises must be used within an ExercisesProvider.');
  }

  return context;
}
