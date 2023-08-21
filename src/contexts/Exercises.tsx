import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { FIRESTORE_DB } from '../lib/firebase/config';
import { NewExerciseFormData } from '../validations/common/CreateExercise';

interface MuscleGroup {
  id: number;
  name: string;
}

interface ExercisesContextData {
  allExercises: NewExerciseFormData[];
  allMuscleGroups: MuscleGroup[];
  getExercisesCollection: () => Promise<void>;
  createExercise: (exercise: NewExerciseFormData) => Promise<void>;
}

export const ExercisesContext = createContext<ExercisesContextData>(
  {} as ExercisesContextData,
);

export const ExercisesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allExercises, setAllExercises] = useState<NewExerciseFormData[]>([]);
  const [allMuscleGroups, setAllMuscleGrops] = useState<MuscleGroup[]>([]);

  // ! Exercises
  async function getExercisesCollection() {
    const exercisesCollectionRef = collection(FIRESTORE_DB, 'exercises');
    const exercisesCollectionSnapshot = await getDocs(exercisesCollectionRef);
    const exercisesCollectionData = exercisesCollectionSnapshot.docs.map(
      (doc) => {
        return { ...doc.data() };
      },
    );
    setAllExercises(exercisesCollectionData as NewExerciseFormData[]);
  }

  async function createExercise(exercise: NewExerciseFormData) {
    try {
      await addDoc(collection(FIRESTORE_DB, 'exercises'), exercise);
    } catch (error) {
      console.error('createExercise function error:', error);
    } finally {
      getExercisesCollection();
    }
  }

  // ! Muscle Groups
  async function getMuscleGroupsCollection() {
    const muscleGroupsCollectionRef = collection(FIRESTORE_DB, 'muscleGroups');
    const muscleGroupsCollectionSnapshot = await getDocs(
      muscleGroupsCollectionRef,
    );
    const muscleGroupsCollectionData = muscleGroupsCollectionSnapshot.docs.map(
      (doc) => {
        return { ...doc.data() };
      },
    );
    setAllMuscleGrops(muscleGroupsCollectionData as MuscleGroup[]);
  }

  useEffect(() => {
    getExercisesCollection();
    getMuscleGroupsCollection();
  }, []);

  return (
    <ExercisesContext.Provider
      value={{
        allExercises,
        getExercisesCollection,
        createExercise,
        allMuscleGroups,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};
