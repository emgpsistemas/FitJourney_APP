import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import clsx from 'clsx';
import { Check } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, FlatList, SafeAreaView, Text, View } from 'react-native';
import { Accordion } from '../../../components/Accordion';
import { Checkbox } from '../../../components/Checkbox';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { TrainingInfo } from '../../../components/TrainingInfo';
import { FitButton } from '../../../components/ui/FitButton';
import {
  TrainingDetailsFormData,
  trainingDetailsSchema,
} from '../../../validations/User/TrainingDetails';

const training = {
  name: 'Treino A',
  exercises: [
    {
      id: 1,
      name: 'Supino Reto',
      description:
        'Deite-se em um banco reto, segure a barra com as mãos na largura dos ombros e afaste os cotovelos até que estejam alinhados com os ombros. Desça a barra até o peito e volte à posição inicial.',
      observations:
        '4 séries de 10 repetições com 1 minuto de descanso entre as séries.',
      series: [
        {
          isChecked: false,
          repetitions: {
            actual: '0',
            lastTraining: '0',
          },
          weight: {
            actual: '0',
            lastTraining: '0',
          },
        },
        {
          isChecked: false,
          repetitions: {
            actual: '0',
            lastTraining: '0',
          },
          weight: {
            actual: '0',
            lastTraining: '0',
          },
        },
        {
          isChecked: false,
          repetitions: {
            actual: '0',
            lastTraining: '0',
          },
          weight: {
            actual: '0',
            lastTraining: '0',
          },
        },
      ],
    },
    {
      id: 2,
      name: 'Supino Declinado',
      description:
        'Deite-se em um banco declinado, segure a barra com as mãos na largura dos ombros e afaste os cotovelos até que estejam alinhados com os ombros. Desça a barra até o peito e volte à posição inicial.',
      observations:
        '4 séries de 10 repetições com 1 minuto de descanso entre as séries.',
      series: [
        {
          isChecked: false,
          repetitions: {
            actual: '0',
            lastTraining: '0',
          },
          weight: {
            actual: '0',
            lastTraining: '0',
          },
        },
        {
          isChecked: false,
          repetitions: {
            actual: '0',
            lastTraining: '0',
          },
          weight: {
            actual: '0',
            lastTraining: '0',
          },
        },
        {
          isChecked: false,
          repetitions: {
            actual: '0',
            lastTraining: '0',
          },
          weight: {
            actual: '0',
            lastTraining: '0',
          },
        },
      ],
    },
  ],
};

interface Serie {
  isChecked: boolean;
  repetitions: {
    actual: string;
    lastTraining: string;
  };
  weight: {
    actual: string;
    lastTraining: string;
  };
}

export function TrainingDetails() {
  const [exerciseBorderColors, setExerciseBorderColors] = useState<any>({});

  const route = useRoute();
  const { goBack } = useNavigation();
  const { id } = route.params as { id: number };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
  } = useForm<TrainingDetailsFormData>({
    defaultValues: {
      name: training.name,
      exercises: training.exercises,
    },
    resolver: zodResolver(trainingDetailsSchema),
  });

  const exercises = watch('exercises', []);

  const onSubmit = (data: TrainingDetailsFormData) => {
    try {
      const payload = {
        exercises: data.exercises.map((exercise) => ({
          id: exercise.id,
          series: exercise.series.map((serie) => ({
            repetitions: serie.repetitions.actual,
            weight: serie.weight.actual,
          })),
        })),
      };
      console.log('PAYLOAD =>', payload);
      Alert.alert('Treino finalizado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro ao finalizar treino', error.message);
    } finally {
      reset();
      goBack();
    }
  };

  const defineBorderColor = () => {
    const exercises = getValues().exercises;
    console.log('Teste');
    const updatedBorderColors = exercises.reduce((borderColors, exercise) => {
      const series = exercise.series;
      const isAllSeriesChecked = series.every(
        (serie: Serie) => serie.isChecked,
      );
      const isSomeSeriesChecked = series.some(
        (serie: Serie) => serie.isChecked,
      );

      let exerciseBorderColor = 'transparent';

      if (isAllSeriesChecked) {
        exerciseBorderColor = 'green';
      } else if (isSomeSeriesChecked) {
        exerciseBorderColor = 'yellow';
      }

      console.log('borderColors', borderColors);
      if (exercise.id) {
        return {
          ...borderColors,
          [exercise.id]: exerciseBorderColor,
        };
      } else {
        return {
          ...borderColors,
        };
      }
    }, {});

    setExerciseBorderColors(updatedBorderColors);
  };

  useEffect(() => {
    defineBorderColor();
  }, [exercises]);

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-16">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <View
          className={clsx('mr-3 h-4 w-4 rounded-full bg-gray-500', {
            'bg-yellow-400': training.name === 'Treino A',
            'bg-rose-500': training.name === 'Treino B',
            'bg-lime-500': training.name === 'Treino C',
            'bg-cyan-500': training.name === 'Treino D',
            'bg-purple-500': training.name === 'Treino E',
          })}
        />
        <ScreenTitle.Text>Treino {id}</ScreenTitle.Text>
        <ScreenTitle.TrainProgress>0/10</ScreenTitle.TrainProgress>
      </ScreenTitle.Root>
      <FlatList
        className="flex flex-1 pt-10"
        ListHeaderComponent={() => <TrainingInfo />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        data={training.exercises}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          return (
            <View
              className={clsx('rounded-[8px] border-2', {
                'border-transparent':
                  exerciseBorderColors[item.id] === 'transparent',
                'border-yellow-400': exerciseBorderColors[item.id] === 'yellow',
                'border-green-500': exerciseBorderColors[item.id] === 'green',
              })}
            >
              <Accordion.Root title={item.name}>
                <Accordion.Content>
                  <View className="mb-4 flex flex-col">
                    <Accordion.ContentTitle>DESCRIÇÃO: </Accordion.ContentTitle>
                    <Accordion.ContentText>
                      {item.description}
                    </Accordion.ContentText>
                  </View>
                  <View className="mb-4 flex flex-col">
                    <Accordion.ContentTitle>
                      OBSERVAÇÕES:{' '}
                    </Accordion.ContentTitle>
                    <Accordion.ContentText>
                      {item.observations}
                    </Accordion.ContentText>
                  </View>
                  {item.series.map((serie, serieIndex) => (
                    <View className="flex flex-col" key={serieIndex}>
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
                                  onChangeText={onChange}
                                  value={value?.toString()}
                                  lastTraining={`${serie.repetitions.lastTraining}x`}
                                  error={
                                    errors.exercises?.[index]?.series?.[
                                      serieIndex
                                    ]?.weight?.actual?.message
                                  }
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
                                  onChangeText={onChange}
                                  value={value?.toString()}
                                  lastTraining={`${serie.weight.lastTraining}kg`}
                                  error={
                                    errors.exercises?.[index]?.series?.[
                                      serieIndex
                                    ]?.weight?.actual?.message
                                  }
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
    </SafeAreaView>
  );
}
