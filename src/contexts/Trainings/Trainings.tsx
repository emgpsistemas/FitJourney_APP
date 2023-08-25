import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { FIRESTORE_DB } from '../../lib/firebase/config';
import {
  CompleteTraining,
  ExerciseCollectionData,
  TrainingCollectionData,
  TrainingDetailsInfo,
  TrainingExercisesData,
  UpdateExercisesPayload,
} from './interface';
interface TrainingsContextData {
  allTrainings: CompleteTraining[];
  trainingDetails: TrainingDetailsInfo;
  trainingExercisesData: TrainingExercisesData[];
  getTrainingsCollection: () => Promise<CompleteTraining[]>;
  getTrainingDetails: (trainingId: string) => Promise<void>;
  updateTraining: (
    id: string,
    training: Omit<UpdateExercisesPayload, 'docId'>,
  ) => Promise<void>;
}

export const TrainingsContext = createContext<TrainingsContextData>(
  {} as TrainingsContextData,
);

export const TrainingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { fitJourneyUser } = useFirebaseAuth();
  const [allTrainings, setAllTrainings] = useState<CompleteTraining[]>([]);
  const [trainingDetails, setTrainingDetails] = useState<TrainingDetailsInfo>(
    {} as TrainingDetailsInfo,
  );
  const [trainingExercisesData, setTrainingExercisesData] = useState<
    TrainingExercisesData[]
  >([]);

  // ! Exercises
  async function getExercisesFromFirestore() {
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
  async function getTrainingsFromFirestore() {
    const trainingsCollectionRef = collection(FIRESTORE_DB, 'trainings');
    const trainingsCollectionSnapshot = await getDocs(trainingsCollectionRef);
    const trainingsCollectionData = trainingsCollectionSnapshot.docs.map(
      (doc) => {
        return { data: doc.data(), docId: doc.id };
      },
    );
    return trainingsCollectionData as TrainingCollectionData[];
  }

  async function getTrainingsCollection() {
    const exercisesCollectionData = await getExercisesFromFirestore();
    const trainingsCollectionData = await getTrainingsFromFirestore();

    const filteredTrainingsCollectionDataByUser =
      trainingsCollectionData.filter(
        (training) => training.data.user_id === fitJourneyUser.uid,
      );

    const trainingsCollectionDataWithExercises =
      filteredTrainingsCollectionDataByUser.map((training) => {
        const exercises = training.data.exercises.map((exercise) => {
          const exerciseData = exercisesCollectionData.find(
            (exerciseData) => exerciseData.docId === exercise.reference.id,
          );
          return { ...exercise, ...exerciseData?.data };
        });
        const muscleGroups = exercises.map((exercise) => exercise.muscle_group);
        const uniqueMuscleGroups = [...new Set(muscleGroups)];
        const trainingId = training.docId;
        const data = training.data;
        const trainingData = { ...data, training_id: trainingId };
        return {
          ...trainingData,
          exercises: exercises,
          muscle_groups: uniqueMuscleGroups,
        };
      });

    setAllTrainings(trainingsCollectionDataWithExercises as CompleteTraining[]);
    return trainingsCollectionDataWithExercises as CompleteTraining[];
  }

  const formatExercises = async (
    trainingData: TrainingDetailsInfo,
  ): Promise<any> => {
    const exercisesCollection = await getExercisesFromFirestore();

    const formattedExercises = trainingData.exercises.map((exercise) => {
      const exerciseData = exercisesCollection.find(
        (exerciseData) => exerciseData.docId === exercise.reference.id,
      )?.data;

      let exerciseSeries = [];
      for (let index = 0; index < exercise.series; index++) {
        exerciseSeries.push({
          isChecked: false,
          repetitions: {
            actual: exercise.last_training[index].repetitions ?? 0,
            lastTraining: exercise.last_training[index].repetitions ?? 0,
          },
          weight: {
            actual: exercise.last_training[index].weight ?? 0,
            lastTraining: exercise.last_training[index].weight ?? 0,
          },
        });
      }
      return { series: exerciseSeries, exerciseData: exerciseData };
    });

    const result = formattedExercises.map((exercise) => {
      return {
        series: exercise.series,
        id: String(exercise.exerciseData?.id) ?? '',
        name: exercise.exerciseData?.name ?? '',
        description: exercise.exerciseData?.description ?? '',
        observations: '',
        // observations: exercise.exerciseData?.observations ?? '',
      };
    });

    return result;
  };

  const getTrainingDetails = async (trainingId: string) => {
    try {
      const trainingsCollectionRef = collection(FIRESTORE_DB, 'trainings');
      const trainingsCollectionSnapshot = await getDocs(trainingsCollectionRef);
      const filteredTrainingsCollectionData =
        trainingsCollectionSnapshot.docs.filter((doc) => doc.id === trainingId);
      const trainingData =
        filteredTrainingsCollectionData[0].data() as TrainingDetailsInfo;
      setTrainingDetails(trainingData);
      const formatedExercises = await formatExercises(trainingData);
      setTrainingExercisesData(formatedExercises);
    } catch (error: any) {
      console.error('Error getting documents: ', error);
    } finally {
    }
  };

  const updateTraining = async (
    id: string,
    training: Omit<UpdateExercisesPayload, 'docId'>,
  ) => {
    try {
      const trainingsCollectionRef = collection(FIRESTORE_DB, 'trainings');
      const trainingsCollectionSnapshot = await getDocs(trainingsCollectionRef);
      const filteredTrainingsCollectionData =
        trainingsCollectionSnapshot.docs.filter((doc) => doc.id === id);
      const trainingData =
        filteredTrainingsCollectionData[0].data() as TrainingDetailsInfo;
      const trainingToUpdate = {
        ...trainingData,
        exercises: training.exercises,
        last_training: training.last_training,
        actual_training: training.actual_training,
      };
      const trainingToUpdateRef = doc(
        FIRESTORE_DB,
        'trainings',
        filteredTrainingsCollectionData[0].id,
      );
      await updateDoc(trainingToUpdateRef, trainingToUpdate);
    } catch (error: any) {
      console.error('Error getting documents: ', error);
    } finally {
    }
  };

  useEffect(() => {
    getTrainingsCollection();
  }, []);

  return (
    <TrainingsContext.Provider
      value={{
        allTrainings,
        trainingDetails,
        trainingExercisesData,
        getTrainingsCollection,
        getTrainingDetails,
        updateTraining,
      }}
    >
      {children}
    </TrainingsContext.Provider>
  );
};
