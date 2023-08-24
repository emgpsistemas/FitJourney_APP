import { DocumentData, DocumentReference } from 'firebase/firestore';
import { NewExerciseFormData } from '../../validations/common/CreateExercise';

export interface ExerciseCollectionData {
  docId: string;
  data: NewExerciseFormData;
}

export interface Exercise {
  observations: string;
  reference: DocumentReference;
  repetitions: number;
  series: number;
}

export interface CompleteExercise extends Exercise {
  description: string;
  id: number;
  muscle_group: string;
  name: string;
}

export interface Training {
  created_at: string;
  exercises: CompleteExercise[];
  name: string;
  training_repetitions: number;
  user_id: string;
  actual_training: string;
  last_training: string;
}

export interface CompleteTraining extends Training {
  training_id: string;
  muscle_groups: string[];
}

export interface LastTraining {
  repetitions: number | null;
  weight: number | null;
}

export interface ExerciseWithReference {
  observations: string;
  reference: DocumentReference<DocumentData, DocumentData>;
  repetitions: number;
  series: number;
  last_training: LastTraining[];
}

export interface TrainingDetailsInfo {
  actual_training: number;
  created_at: string;
  exercises: ExerciseWithReference[];
  last_training: null | string;
  name: string;
  training_repetitions: number;
  user_id: string;
}
