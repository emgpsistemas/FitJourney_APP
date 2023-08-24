import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { FIRESTORE_DB } from '../../lib/firebase/config';
import { uniqueID } from '../../utils/uniqueID';
import {
  CompleteExercise,
  CompleteTraining,
  Exercise,
  ExerciseCollectionData,
  TrainingDetailsInfo,
} from './interface';

interface TrainingsContextData {
  allTrainings: CompleteTraining[];
  trainingDetails: TrainingDetailsInfo;
  getTrainingsCollection: () => Promise<CompleteTraining[]>;
  getTrainingDetails: (trainingId: string) => Promise<void>;
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

    const filteredTrainingsCollectionDataByUser =
      trainingsCollectionData.filter(
        (training) => training.data.user_id === fitJourneyUser.uid,
      );

    const trainingsCollectionDataWithExercises =
      filteredTrainingsCollectionDataByUser.map((training) => {
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
      });

    setAllTrainings(trainingsCollectionDataWithExercises as CompleteTraining[]);
    return trainingsCollectionDataWithExercises as CompleteTraining[];
  }

  const formatExercisesSeries = (trainingData: TrainingDetailsInfo) => {
    console.log('trainingData.exercises', trainingData.exercises);
    const formattedExercises = trainingData.exercises.map((exercise) => {
      let exerciseSeries = [];
      for (let i = 0; i < exercise.series; i++) {
        exerciseSeries.push({
          isChecked: false,
          repetitions: {
            actual: exercise.last_training[i].repetitions ?? 0,
            lastTraining: exercise.last_training[i].repetitions ?? 0,
          },
          weight: {
            actual: exercise.last_training[i].weight ?? 0,
            lastTraining: exercise.last_training[i].weight ?? 0,
          },
        });
      }
      return exerciseSeries;
    });

    return formattedExercises[0];
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
      const formattedSeries = formatExercisesSeries(trainingData);

      const result = [
        {
          series: formattedSeries,
          id: String(uniqueID()),
          name: 'Teste',
          description: '',
          observations: '',
        },
      ];

      console.log('result', result);
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
        getTrainingsCollection,
        getTrainingDetails,
      }}
    >
      {children}
    </TrainingsContext.Provider>
  );
};
