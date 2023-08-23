import { DocumentData, DocumentReference } from 'firebase/firestore';

export interface LastTraining {
  repetitions: number | null;
  weight: number | null;
}

interface Exercise {
  observations: string;
  reference: DocumentReference<DocumentData, DocumentData>;
  repetitions: number;
  series: number;
  last_training: LastTraining[];
}

export interface TrainingDetailsInfo {
  actual_training: number;
  created_at: string;
  exercises: Exercise[];
  last_training: null | string;
  name: string;
  training_repetitions: number;
  user_id: string;
}
