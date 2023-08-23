import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { FIRESTORE_DB } from '../lib/firebase/config';
import { NewExerciseFormData } from '../validations/common/CreateExercise';

interface MuscleGroup {
  id: number;
  name: string;
}

interface ExercisesWithReference extends NewExerciseFormData {
  docId: string;
}

interface ExercisesContextData {
  allExercises: ExercisesWithReference[];
  allMuscleGroups: MuscleGroup[];
  getExercisesCollection: () => Promise<NewExerciseFormData[]>;
  createExercise: (exercise: NewExerciseFormData) => Promise<void>;
  updateExercise: (exercise: NewExerciseFormData) => Promise<void>;
  deleteExercise: (exercise: NewExerciseFormData) => Promise<void>;
}

export const ExercisesContext = createContext<ExercisesContextData>(
  {} as ExercisesContextData,
);

export const ExercisesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allExercises, setAllExercises] = useState<ExercisesWithReference[]>(
    [],
  );
  const [allMuscleGroups, setAllMuscleGrops] = useState<MuscleGroup[]>([]);

  // ! Exercises
  async function getExercisesCollection() {
    const exercisesCollectionRef = collection(FIRESTORE_DB, 'exercises');
    const exercisesCollectionSnapshot = await getDocs(exercisesCollectionRef);
    const exercisesCollectionData = exercisesCollectionSnapshot.docs.map(
      (doc) => {
        return { ...doc.data(), docId: doc.id };
      },
    );
    setAllExercises(exercisesCollectionData as ExercisesWithReference[]);
    return exercisesCollectionData as ExercisesWithReference[];
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

  async function updateExercise(exercise: NewExerciseFormData) {
    try {
      const exercisesCollectionRef = collection(FIRESTORE_DB, 'exercises');
      const exercisesCollectionSnapshot = await getDocs(exercisesCollectionRef);
      const exercisesCollectionData = exercisesCollectionSnapshot.docs.map(
        (doc) => {
          const documentId = doc.id;
          return { docId: documentId, data: doc.data() };
        },
      );
      const exerciseToUpdate = exercisesCollectionData.find(
        (exerciseToFind) => exerciseToFind.data.id === exercise.id,
      );

      if (exerciseToUpdate) {
        const exerciseToUpdateRef = doc(
          FIRESTORE_DB,
          'exercises',
          exerciseToUpdate.docId,
        );

        await updateDoc(exerciseToUpdateRef, exercise);
      }
    } catch (error) {
      console.error('updateExercise function error:', error);
    } finally {
      getExercisesCollection();
    }
  }

  async function deleteExercise(exercise: NewExerciseFormData) {
    try {
      const exercisesCollectionRef = collection(FIRESTORE_DB, 'exercises');
      const exercisesCollectionSnapshot = await getDocs(exercisesCollectionRef);
      const exercisesCollectionData = exercisesCollectionSnapshot.docs.map(
        (doc) => {
          const documentId = doc.id;
          return { docId: documentId, data: doc.data() };
        },
      );
      const exerciseToDelete = exercisesCollectionData.find(
        (exerciseToFind) => exerciseToFind.data.id === exercise.id,
      );

      if (exerciseToDelete) {
        const exerciseToDeleteRef = doc(
          FIRESTORE_DB,
          'exercises',
          exerciseToDelete.docId,
        );
        await deleteDoc(exerciseToDeleteRef);
      }
    } catch (error) {
      console.error('deleteExercise function error:', error);
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
        updateExercise,
        deleteExercise,
        allMuscleGroups,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};
