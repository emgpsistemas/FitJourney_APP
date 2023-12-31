import { DocumentData, DocumentReference } from 'firebase/firestore';
import { NewExerciseFormData } from '../../validations/common/CreateExercise';

export interface ExerciseCollectionData {
  docId: string;
  data: NewExerciseFormData;
}

export interface LastTraining {
  repetitions: number | null;
  weight: number | null;
}
export interface Exercise {
  observations: string;
  reference: DocumentReference;
  repetitions: number;
  series: number;
  last_training: LastTraining[];
}
export interface TrainingDetailsData {
  exercises: Exercise[];
  created_at: string;
  name: string;
  training_repetitions: number;
  user_id: string;
  actual_training: string;
  last_training: string | null;
}
export interface TrainingCollectionData {
  docId: string;
  data: TrainingDetailsData;
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

export interface FinalSeriesData {
  isChecked: boolean;
  repetitions: {
    actual: number;
    lastTraining: number;
  };
  weight: {
    actual: number;
    lastTraining: number;
  };
}

export interface TrainingExercisesData {
  description: string;
  id: string;
  name: string;
  observations: string;
  series: FinalSeriesData[];
}

export interface UpdateExercisesKeyPayload {
  last_training: {
    repetitions: number;
    weight: number;
  }[];
  reference: DocumentReference | undefined;
  repetitions: number;
  series: number;
  observations: string;
}

export interface UpdateExercisesPayload {
  docId: string;
  actual_training: number;
  last_training: string;
  exercises: UpdateExercisesKeyPayload[];
}
