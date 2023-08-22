import { DocumentReference } from 'firebase/firestore';

export interface MultipleSelectOption {
  value: number | string;
  label: string;
}

export interface Exercise {
  id: number;
  name: string;
  description: string;
  muscle_group: string;
  repetitions: number;
  series: number;
  observations: string;
}

export interface PayloadExercise {
  observations: string;
  reference: DocumentReference;
  repetitions: number;
  series: number;
}

export interface TrainingForm {
  name: string;
  exercises: Exercise[];
  training_repetitions: number;
}

export type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'DECREMENT_TRAINING_REPETITIONS' }
  | { type: 'INCREMENT_TRAINING_REPETITIONS' }
  | { type: 'SET_SELECTED_EXERCISES'; payload: Exercise[] };
// | { type: 'SET_EXERCISE_REPETITIONS'; payload: Exercise[] }
// | { type: 'SET_EXERCISE_SERIES'; payload: Exercise[] }
// | { type: 'SET_EXERCISE_OBSERVATIONS'; payload: Exercise[] }
// | { type: 'SET_EXERCISE_REFERENCE'; payload: Exercise[] }
