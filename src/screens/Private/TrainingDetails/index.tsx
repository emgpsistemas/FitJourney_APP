import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import clsx from 'clsx';
import { Check } from 'phosphor-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Accordion } from '../../../components/Accordion';
import { Checkbox } from '../../../components/Checkbox';
import { Loading } from '../../../components/Loading';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { TrainingInfo } from '../../../components/TrainingInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { UpdateExercisesKeyPayload } from '../../../contexts/Trainings/interface';
import { useExercises } from '../../../hooks/useExercises';
import { useTrainings } from '../../../hooks/useTrainings';
import { toastConfig } from '../../../lib/toast/config';
import { uniqueID } from '../../../utils/uniqueID';
import {
  TrainingDetailsFormData,
  trainingDetailsSchema,
} from '../../../validations/User/TrainingDetails';

export function TrainingDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const { allExercises } = useExercises();
  const {
    getTrainingDetails,
    trainingDetails,
    trainingExercisesData,
    updateTraining,
  } = useTrainings();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
    setValue,
  } = useForm<TrainingDetailsFormData>({
    defaultValues: {
      exercises: [],
    },
    resolver: zodResolver(trainingDetailsSchema),
  });
  const trainingExercises = getValues('exercises');

  const onSubmit = async (data: TrainingDetailsFormData) => {
    try {
      const trainingExercisesInfo = data.exercises.map((exercise) => {
        const exerciseReference = allExercises.find(
          (allExercise) => allExercise.name === exercise.name,
        );
        return exerciseReference;
      });
      const trainingExercisesPayload = trainingExercisesInfo.map(
        (exerciseInfo, index) => {
          const exercisePayload: UpdateExercisesKeyPayload = {
            last_training: data.exercises[index].series.map((serie) => {
              return {
                repetitions: serie.repetitions.actual,
                weight: serie.weight.actual,
              };
            }),
            reference: exerciseInfo?.docReference,
            repetitions: trainingDetails.exercises[index].repetitions,
            series: trainingDetails.exercises[index].series,
            observations: trainingDetails.exercises[index].observations,
          };
          return exercisePayload;
        },
      );
      const payload = {
        actual_training: trainingDetails.actual_training + 1,
        last_training: new Date().toISOString(),
        exercises: trainingExercisesPayload,
        series: trainingDetails.training_repetitions,
      };
      await updateTraining(id, payload);
      Toast.show({
        type: 'success',
        text1: 'Treino finalizado com sucesso!',
        position: 'bottom',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao finalizar treino!',
        text2: 'Tente novamente',
        position: 'bottom',
      });
    } finally {
      reset();
      setTimeout(() => {
        navigate('RegisteredTrainings');
      }, 2000);
    }
  };

  watch('exercises');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [getValues('exercises')]);

  useFocusEffect(
    useCallback(() => {
      getTrainingDetails(id).then(() =>
        setValue('exercises', trainingExercisesData),
      );
    }, []),
  );

  if (!isFocused) {
    return <></>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-5">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <View
          className={clsx('mr-3 h-4 w-4 rounded-full bg-gray-500', {
            'bg-yellow-400': trainingDetails.name === 'Treino A',
            'bg-rose-500': trainingDetails.name === 'Treino B',
            'bg-lime-500': trainingDetails.name === 'Treino C',
            'bg-cyan-500': trainingDetails.name === 'Treino D',
            'bg-purple-500': trainingDetails.name === 'Treino E',
          })}
        />
        <ScreenTitle.Text>{trainingDetails.name}</ScreenTitle.Text>
        <ScreenTitle.TrainProgress>{`${trainingDetails.actual_training}/${trainingDetails.training_repetitions}`}</ScreenTitle.TrainProgress>
      </ScreenTitle.Root>
      <FlatList
        className="flex flex-1 pt-10"
        ListHeaderComponent={() => (
          <TrainingInfo
            trainingDates={{
              startDate: trainingDetails.created_at,
              lastTrainingDate: trainingDetails.last_training,
            }}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        data={trainingExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <View
              className={clsx('rounded-[8px] border-2 border-transparent', {})}
            >
              <Accordion.Root title={item.name ? item.name : ''}>
                <Accordion.Content>
                  <View className="mb-4 flex flex-col">
                    <Accordion.ContentTitle>DESCRIÇÃO: </Accordion.ContentTitle>
                    <Accordion.ContentText>
                      {item.description}
                    </Accordion.ContentText>
                  </View>
                  {item.observations ? (
                    <View className="mb-4 flex flex-col">
                      <Accordion.ContentTitle>
                        OBSERVAÇÕES:{' '}
                      </Accordion.ContentTitle>
                      <Accordion.ContentText>
                        {item.observations}
                      </Accordion.ContentText>
                    </View>
                  ) : null}

                  {item.series.map((serie, serieIndex) => (
                    <View className="flex flex-col" key={uniqueID()}>
                      <Accordion.ContentTitle>
                        SÉRIE {serieIndex + 1}:
                      </Accordion.ContentTitle>
                      <Checkbox.Root key={serieIndex}>
                        <View
                          className="flex flex-row items-center"
                          style={{ gap: 12 }}
                        >
                          <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Checkbox.Toggle
                                checked={value}
                                onPress={() => onChange(!value)}
                              />
                            )}
                            name={`exercises.${index}.series.${serieIndex}.isChecked`}
                          />
                          <View
                            className="flex flex-1 flex-row"
                            style={{ gap: 12 }}
                          >
                            <Controller
                              control={control}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <Checkbox.Input
                                  onBlur={onBlur}
                                  label="Repetições"
                                  onChangeText={(text) =>
                                    onChange(Number(text))
                                  }
                                  value={value?.toString()}
                                  lastTraining={`${serie.repetitions.lastTraining}x`}
                                  error={
                                    errors.exercises?.[index]?.series?.[
                                      serieIndex
                                    ]?.weight?.actual?.message
                                  }
                                  className="m-0 h-14 rounded-lg bg-white px-5 py-2 font-openSemibold"
                                />
                              )}
                              name={`exercises.${index}.series.${serieIndex}.repetitions.actual`}
                            />
                            <Controller
                              control={control}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <Checkbox.Input
                                  onBlur={onBlur}
                                  label="Peso"
                                  onChangeText={(text) =>
                                    onChange(Number(text))
                                  }
                                  value={value?.toString()}
                                  lastTraining={`${serie.weight.lastTraining}kg`}
                                  error={
                                    errors.exercises?.[index]?.series?.[
                                      serieIndex
                                    ]?.weight?.actual?.message
                                  }
                                  className="m-0 h-14 rounded-lg bg-white px-5 py-2 font-openSemibold"
                                />
                              )}
                              name={`exercises.${index}.series.${serieIndex}.weight.actual`}
                            />
                          </View>
                          {errors.exercises?.[index]?.series?.[serieIndex] ? (
                            <Text>
                              {
                                errors.exercises?.[index]?.series?.[serieIndex]
                                  ?.message
                              }
                            </Text>
                          ) : null}
                        </View>
                      </Checkbox.Root>
                    </View>
                  ))}
                </Accordion.Content>
              </Accordion.Root>
            </View>
          );
        }}
        ListFooterComponent={() => (
          <View className="mb-12 pb-7 pt-5">
            <FitButton.Root variant="primary" onPress={handleSubmit(onSubmit)}>
              <FitButton.Icon icon={Check} />
              <FitButton.Text>Finalizar Treino</FitButton.Text>
            </FitButton.Root>
          </View>
        )}
      />
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
