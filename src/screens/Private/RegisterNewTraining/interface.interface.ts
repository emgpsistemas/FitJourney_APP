import { DocumentData, DocumentReference } from 'firebase/firestore';

export interface MultipleSelectOption {
  value: number | string;
  label: string;
}

export interface Exercise {
  docId: string;
  id: number;
  name: string;
  description: string;
  muscle_group: string;
  repetitions: number;
  series: number;
  observations: string;
}

export interface LastTraining {
  repetitions: number | null;
  weight: number | null;
}

export interface PayloadExercise {
  observations: string;
  reference: DocumentReference<DocumentData, DocumentData>;
  repetitions: number;
  series: number;
  last_training: LastTraining[];
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
  | { type: 'SET_SELECTED_EXERCISES'; payload: Exercise[] }
  | { type: 'UPDATE_REPETITIONS'; exerciseId: number; repetitions: number }
  | { type: 'UPDATE_SERIES'; exerciseId: number; series: number }
  | { type: 'UPDATE_OBSERVATIONS'; exerciseId: number; observations: string };

export interface PayloadCreateTraining {
  user_id: string;
  name: string;
  training_repetitions: number;
  actual_training: number;
  created_at: string;
  last_training: null | string;
  exercises: PayloadExercise[];
}
