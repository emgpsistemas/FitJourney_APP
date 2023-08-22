import { DocumentReference, collection, getDocs } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { FIRESTORE_DB } from '../lib/firebase/config';
import { NewExerciseFormData } from '../validations/common/CreateExercise';

interface ExerciseCollectionData {
  docId: string;
  data: NewExerciseFormData;
}

interface Exercise {
  observations: string;
  reference: DocumentReference;
  repetitions: number;
  series: number;
}

interface CompleteExercise extends Exercise {
  description: string;
  id: number;
  muscle_group: string;
  name: string;
}

interface Training {
  created_at: string;
  exercises: CompleteExercise[];
  name: string;
  training_repetitions: number;
  user_id: string;
}

export interface CompleteTraining extends Training {
  training_id: string;
  muscle_groups: string[];
}

interface TrainingsContextData {
  allTrainings: CompleteTraining[];
  getTrainingsCollection: () => Promise<CompleteTraining[]>;
}

export const TrainingsContext = createContext<TrainingsContextData>(
  {} as TrainingsContextData,
);

export const TrainingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allTrainings, setAllTrainings] = useState<CompleteTraining[]>([]);

  console.log('allTrainings', allTrainings);

  // ! Exercises
  async function getExercisesCollection() {
    const exercisesCollectionRef = collection(FIRESTORE_DB, 'exercises');
    const exercisesCollectionSnapshot = await getDocs(exercisesCollectionRef);
    const exercisesCollectionData = exercisesCollectionSnapshot.docs.map(
      (doc) => {
        return { data: doc.data(), docId: doc.id };
      },
    );
    return exercisesCollectionData as ExerciseCollectionData[];
  }

  // ! Trainings
  async function getTrainingsCollection() {
    const exercisesCollectionData = await getExercisesCollection();

    const trainingsCollectionRef = collection(FIRESTORE_DB, 'trainings');
    const trainingsCollectionSnapshot = await getDocs(trainingsCollectionRef);
    const trainingsCollectionData = trainingsCollectionSnapshot.docs.map(
      (doc) => {
        return { data: doc.data(), id: doc.id };
      },
    );

    const trainingsCollectionDataWithExercises = trainingsCollectionData.map(
      (training) => {
        const exercises: CompleteExercise[] = training.data.exercises.map(
          (exercise: Exercise) => {
            const exerciseData = exercisesCollectionData.find(
              (exerciseData) => exerciseData.docId === exercise.reference.id,
            );
            return { ...exercise, ...exerciseData?.data };
          },
        );
        const muscleGroups = exercises.map((exercise) => exercise.muscle_group);
        const uniqueMuscleGroups = [...new Set(muscleGroups)];
        const training_id = training.id;
        const data = training.data;
        const trainingData = { ...data, training_id };
        return {
          ...trainingData,
          exercises: exercises,
          muscle_groups: uniqueMuscleGroups,
        };
      },
    );

    setAllTrainings(trainingsCollectionDataWithExercises as CompleteTraining[]);
    return trainingsCollectionDataWithExercises as CompleteTraining[];
  }

  useEffect(() => {
    getTrainingsCollection();
  }, []);

  return (
    <TrainingsContext.Provider
      value={{
        allTrainings,
        getTrainingsCollection,
      }}
    >
      {children}
    </TrainingsContext.Provider>
  );
};
