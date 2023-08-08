import { Check, Trash } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from 'tailwindcss/colors';
import { Accordion } from '../../../components/Accordion';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { FitButton } from '../../../components/ui/FitButton';
import { Input } from '../../../components/ui/Input';
import { MultipleSelect } from '../../../components/ui/MultipleSelect';
import { TextArea } from '../../../components/ui/Textarea';

interface MultipleSelectOption {
  value: number | string;
  label: string;
}

const exercisesMock = [
  {
    id: 1,
    name: 'Supino Reto',
    description: 'Descrição do exercício',
    muscleGroup: 'Peito',
  },
  {
    id: 2,
    name: 'Supino Inclinado',
    description: 'Descrição do exercício',
    muscleGroup: 'Peito',
  },
  {
    id: 3,
    name: 'Leg Press',
    description: 'Descrição do exercício',
    muscleGroup: 'Pernas',
  },
];

export function RegisterNewTraining() {
  const [allExercises, setAllExercises] = useState(exercisesMock);

  const [exercisesOptions, setExercisesOptions] = useState<
    MultipleSelectOption[]
  >([]);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

  const formatExercises = () => {
    const formatedExercises = allExercises.map((exercise) => {
      return {
        label: exercise.name.toUpperCase(),
        value: exercise.id,
      };
    });
    setExercisesOptions(formatedExercises);
  };

  const exercisesWithAllInformation = selectedExercises.map((exercise) => {
    const foundExercise = allExercises.find((ex) => ex.id === exercise);
    return {
      id: foundExercise!.id,
      name: foundExercise!.name,
      description: foundExercise!.description,
      muscleGroup: foundExercise!.muscleGroup,
      repetitions: 10,
      series: 3,
      observations: '',
    };
  });

  useEffect(() => {
    formatExercises();
  }, []);

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenTitle.Root>
          <ScreenTitle.GoBackButton />
          <ScreenTitle.Text>Cadastrar Treino</ScreenTitle.Text>
        </ScreenTitle.Root>
        <View className="pt-10">
          <MultipleSelect
            options={exercisesOptions.sort((a, b) =>
              a.label > b.label ? 1 : -1,
            )}
            selected={selectedExercises}
            setSelected={setSelectedExercises}
            label="NOME DO EXERCÍCIO"
          />
        </View>
        {selectedExercises && selectedExercises.length > 0 ? (
          <View className="mt-4">
            {exercisesWithAllInformation.map((exercise) => (
              <View className="py-2" key={exercise.id}>
                <Accordion.RootWithTrash
                  title={exercise.name}
                  isInitiallyOpen
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
                          onChangeText={(text) => console.log(text)}
                          value={exercise.series.toString()}
                          className="m-0 h-14 rounded-lg bg-white px-5 py-2 font-openSemibold"
                        />
                      </View>
                      <View className="flex w-[48%]">
                        <Input
                          label="Repetições"
                          onChangeText={(text) => console.log(text)}
                          value={exercise.repetitions.toString()}
                          className="m-0 h-14 rounded-lg bg-white px-5 py-2 font-openSemibold"
                        />
                      </View>
                    </View>
                    <TextArea
                      label="Observações"
                      value={exercise.observations}
                      className="m-0 rounded-lg bg-white px-5 py-2 font-openSemibold"
                    />
                  </Accordion.Content>
                </Accordion.RootWithTrash>
              </View>
            ))}
          </View>
        ) : null}
        <View className="flex flex-col space-y-6 pb-6 pt-3">
          <Input
            label="Quantidade de Repetições do Treino"
            onChangeText={(text) => console.log(text)}
            value={''}
          />
          <FitButton.Root
            variant="primary"
            onPress={() => console.log('Finalizar Cadastro')}
          >
            <FitButton.Icon icon={Check} />
            <FitButton.Text>Finalizar Cadastro</FitButton.Text>
          </FitButton.Root>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
