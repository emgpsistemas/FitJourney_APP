import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { FIRESTORE_DB } from '../lib/firebase/config';

interface Exercise {
  id: number;
  name: string;
  description: string;
  muscle_group: string;
}

interface ExercisesContextData {
  allExercises: Exercise[];
  getExercisesCollection: () => Promise<void>;
}

export const ExercisesContext = createContext<ExercisesContextData>(
  {} as ExercisesContextData,
);

export const ExercisesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);

  async function getExercisesCollection() {
    const exercisesCollectionRef = collection(FIRESTORE_DB, 'exercises');
    const exercisesCollectionSnapshot = await getDocs(exercisesCollectionRef);
    const exercisesCollectionData = exercisesCollectionSnapshot.docs.map(
      (doc) => {
        return { ...doc.data() };
      },
    );
    setAllExercises(exercisesCollectionData as Exercise[]);
  }

  console.log('allExercises =>', allExercises);

  useEffect(() => {
    getExercisesCollection();
  }, []);

  return (
    <ExercisesContext.Provider value={{ allExercises, getExercisesCollection }}>
      {children}
    </ExercisesContext.Provider>
  );
};
