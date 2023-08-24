import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { FIRESTORE_DB } from '../../lib/firebase/config';
import {
  CompleteTraining,
  ExerciseCollectionData,
  FinalSeriesData,
  TrainingCollectionData,
  TrainingDetailsInfo,
  TrainingExercisesData,
} from './interface';

interface TrainingsContextData {
  allTrainings: CompleteTraining[];
  trainingDetails: TrainingDetailsInfo;
  trainingExercisesData: TrainingExercisesData[];
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

  const formatExercisesSeries = (
    trainingData: TrainingDetailsInfo,
  ): FinalSeriesData[] => {
    const formattedExercises = trainingData.exercises.map((exercise) => {
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

      const exercises = [
        {
          series: formattedSeries,
          id: filteredTrainingsCollectionData[0].id,
          name: 'Teste',
          description: '',
          observations: '',
        },
      ];

      setTrainingExercisesData(exercises);
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
      }}
    >
      {children}
    </TrainingsContext.Provider>
  );
};
