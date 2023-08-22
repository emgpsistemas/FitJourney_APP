import { useContext } from 'react';
import { TrainingsContext } from '../contexts/Trainings';

export function useTrainings() {
  const context = useContext(TrainingsContext);

  if (!context) {
    throw new Error('useTrainings must be used within an TrainingsProvider.');
  }

  return context;
}
