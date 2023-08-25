import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc } from 'firebase/firestore';
import { Check, Minus, Plus, Trash } from 'phosphor-react-native';
import { useEffect, useReducer, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import colors from 'tailwindcss/colors';
import { Accordion } from '../../../components/Accordion';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { FitButton } from '../../../components/ui/FitButton';
import { Input } from '../../../components/ui/Input';
import { MultipleSelect } from '../../../components/ui/MultipleSelect';
import { TextArea } from '../../../components/ui/Textarea';
import { useExercises } from '../../../hooks/useExercises';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';
import { useTrainings } from '../../../hooks/useTrainings';
import { FIRESTORE_DB } from '../../../lib/firebase/config';
import { toastConfig } from '../../../lib/toast/config';
import {
  Action,
  MultipleSelectOption,
  PayloadCreateTraining,
  TrainingForm,
} from './interface.interface';

const trainingRegisterReducer = (
  state: TrainingForm,
  action: Action,
): TrainingForm => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'DECREMENT_TRAINING_REPETITIONS':
      return {
        ...state,
        training_repetitions: state.training_repetitions - 1,
      };
    case 'INCREMENT_TRAINING_REPETITIONS':
      return {
        ...state,
        training_repetitions: state.training_repetitions + 1,
      };
    case 'SET_SELECTED_EXERCISES':
      return {
        ...state,
        exercises: action.payload,
      };
    case 'UPDATE_REPETITIONS':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.exerciseId
            ? { ...exercise, repetitions: action.repetitions }
            : exercise,
        ),
      };
    case 'UPDATE_SERIES':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.exerciseId
            ? { ...exercise, series: action.series }
            : exercise,
        ),
      };
    case 'UPDATE_OBSERVATIONS':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.exerciseId
            ? { ...exercise, observations: action.observations }
            : exercise,
        ),
      };
    default:
      return state;
  }
};

export function RegisterNewTraining() {
  const { goBack } = useNavigation();
  const { fitJourneyUser } = useFirebaseAuth();
  const { getTrainingsCollection } = useTrainings();
  const { allExercises } = useExercises();
  const [exercisesOptions, setExercisesOptions] = useState<
    MultipleSelectOption[]
  >([]);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

  const [trainingRegisterState, dispatchTrainingRegisterState] = useReducer(
    trainingRegisterReducer,
    {
      name: '',
      exercises: [],
      training_repetitions: 10,
    },
  );

  const handleExerciseSelection = (selectedExerciseIds: number[]) => {
    const updatedExercises = selectedExerciseIds.map((selectedExerciseId) => {
      const foundExercise = allExercises.find(
        (exercise) => exercise.id === selectedExerciseId,
      );
      return {
        docId: foundExercise!.docId,
        id: foundExercise!.id,
        name: foundExercise!.name,
        description: foundExercise!.description,
        muscle_group: foundExercise!.muscle_group,
        repetitions: 10,
        series: 3,
        observations: '',
      };
    });

    dispatchTrainingRegisterState({
      type: 'SET_SELECTED_EXERCISES',
      payload: updatedExercises,
    });
  };

  const handleRepetitionsChange = (exerciseId: number, repetitions: number) => {
    dispatchTrainingRegisterState({
      type: 'UPDATE_REPETITIONS',
      exerciseId,
      repetitions,
    });
  };

  const handleSeriesChange = (exerciseId: number, series: number) => {
    dispatchTrainingRegisterState({
      type: 'UPDATE_SERIES',
      exerciseId,
      series,
    });
  };

  const handleObservationsChange = (
    exerciseId: number,
    observations: string,
  ) => {
    dispatchTrainingRegisterState({
      type: 'UPDATE_OBSERVATIONS',
      exerciseId,
      observations,
    });
  };

  const formatExercises = () => {
    const formatedExercises = allExercises.map((exercise) => {
      return {
        label: exercise.name.toUpperCase(),
        value: exercise.id,
      };
    });
    setExercisesOptions(formatedExercises);
  };

  async function createTraining(training: PayloadCreateTraining) {
    try {
      await addDoc(collection(FIRESTORE_DB, 'trainings'), training);
    } catch (error) {
      console.error('createTraining function error:', error);
    } finally {
      getTrainingsCollection();
    }
  }

  const handleConfirm = () => {
    if (selectedExercises.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Algo deu errado :(',
        text2: 'Adicione exercícios para continuar',
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
    } else {
      const payload = {
        user_id: fitJourneyUser.uid,
        name: trainingRegisterState.name,
        training_repetitions: trainingRegisterState.training_repetitions,
        actual_training: 1,
        created_at: new Date().toISOString(),
        last_training: null,
        exercises: trainingRegisterState.exercises.map((exercise) => {
          let lastTraining = [];

          for (let index = 0; index < exercise.series; index++) {
            lastTraining.push({
              repetitions: null,
              weight: null,
            });
          }

          return {
            reference: doc(FIRESTORE_DB, 'exercises', exercise.docId),
            repetitions: exercise.repetitions,
            series: exercise.series,
            observations: exercise.observations,
            last_training: lastTraining,
          };
        }),
      };
      createTraining(payload).then(() => {
        Toast.show({
          type: 'success',
          text1: 'Treino cadastrado com sucesso!',
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
        setTimeout(() => {
          goBack();
        }, 2000);
      });
    }
  };

  useEffect(() => {
    formatExercises();
  }, []);

  useEffect(() => {
    formatExercises();
    handleExerciseSelection(selectedExercises);
  }, [selectedExercises]);

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenTitle.Root>
          <ScreenTitle.GoBackButton />
          <ScreenTitle.Text>Cadastrar Treino</ScreenTitle.Text>
        </ScreenTitle.Root>
        <View className="pt-10">
          <Input
            label="NOME DO TREINO"
            onChangeText={(text) =>
              dispatchTrainingRegisterState({
                type: 'SET_NAME',
                payload: text,
              })
            }
            value={trainingRegisterState.name}
          />
        </View>
        <View className="pt-4">
          <MultipleSelect
            options={exercisesOptions.sort((a, b) =>
              a.label > b.label ? 1 : -1,
            )}
            selected={selectedExercises}
            setSelected={setSelectedExercises}
            label="EXERCÍCIOS"
          />
        </View>
        {trainingRegisterState.exercises &&
        trainingRegisterState.exercises.length > 0 ? (
          <View className="mt-4">
            {trainingRegisterState.exercises.map((exercise) => (
              <View className="py-2" key={exercise.id}>
                <Accordion.RootWithTrash
                  title={exercise.name}
                  trashComponent={
                    <TouchableOpacity
                      className="w-12 items-center justify-center rounded-l-lg bg-red-700"
                      activeOpacity={0.7}
                      onPress={() =>
                        setSelectedExercises(
                          selectedExercises.filter(
                            (item) => item !== exercise.id,
                          ),
                        )
                      }
                    >
                      <Trash size={24} color={colors.white} weight="bold" />
                    </TouchableOpacity>
                  }
                >
                  <Accordion.Content>
                    <Accordion.ContentTitle>Descrição:</Accordion.ContentTitle>
                    <Accordion.ContentText>
                      {exercise.description}
                    </Accordion.ContentText>
                    <View className="my-4 flex flex-1 flex-row justify-between">
                      <View className="flex w-[48%]">
                        <Input
                          label="Séries"
                          onChangeText={(text) => {
                            handleSeriesChange(exercise.id, Number(text));
                          }}
                          value={exercise.series.toString()}
                          className="m-0 h-14 rounded-lg bg-white px-5 py-2 font-openSemibold"
                        />
                      </View>
                      <View className="flex w-[48%]">
                        <Input
                          label="Repetições"
                          onChangeText={(text) => {
                            handleRepetitionsChange(exercise.id, Number(text));
                          }}
                          value={exercise.repetitions.toString()}
                          className="m-0 h-14 rounded-lg bg-white px-5 py-2 font-openSemibold"
                        />
                      </View>
                    </View>
                    <TextArea
                      onChangeText={(text) =>
                        handleObservationsChange(exercise.id, text)
                      }
                      label="Observações"
                      value={exercise.observations}
                      className="m-0 rounded-lg bg-white px-5 py-2 font-openSemibold"
                    />
                  </Accordion.Content>
                </Accordion.RootWithTrash>
              </View>
            ))}
          </View>
        ) : (
          <View
            className="my-4 flex h-48 items-center justify-center rounded-lg"
            style={{
              borderColor: colors.zinc[300],
              borderWidth: 2,
              borderStyle: 'dashed',
            }}
          >
            <Text className="mx-5 text-center font-openSemibold text-sm text-zinc-900">
              Nenhum exercício adicionado. Adicione exercícios para continuar.
            </Text>
          </View>
        )}
        <View className="flex flex-col space-y-6 pb-6 pt-3">
          <Text className="text-center font-openBold text-sm leading-relaxed text-neutral-900">
            QUANTAS VEZES VOCÊ DESEJA REPETIR ESTE TREINO?
          </Text>
          <View className="flex flex-row justify-between px-10">
            <TouchableOpacity
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 p-2"
              activeOpacity={0.7}
              onPress={() =>
                dispatchTrainingRegisterState({
                  type: 'DECREMENT_TRAINING_REPETITIONS',
                })
              }
            >
              <Minus size={24} color={colors.zinc[900]} weight="bold" />
            </TouchableOpacity>

            <Text className="font-openBold text-lg text-zinc-900">
              {trainingRegisterState.training_repetitions}
            </Text>
            <TouchableOpacity
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 p-2"
              activeOpacity={0.7}
              onPress={() =>
                dispatchTrainingRegisterState({
                  type: 'INCREMENT_TRAINING_REPETITIONS',
                })
              }
            >
              <Plus size={24} color={colors.zinc[900]} weight="bold" />
            </TouchableOpacity>
          </View>
          <FitButton.Root variant="primary" onPress={handleConfirm}>
            <FitButton.Icon icon={Check} />
            <FitButton.Text>Finalizar Cadastro</FitButton.Text>
          </FitButton.Root>
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
