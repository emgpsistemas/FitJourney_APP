import { Check, Minus, Plus, Trash } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
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
import { toastConfig } from '../../../lib/toast/config';

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
  const [repetitions, setRepetitions] = useState(10);

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
      console.log('Tudo certo');
    }
  };

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
              onPress={() => setRepetitions(repetitions - 1)}
            >
              <Minus size={24} color={colors.zinc[900]} weight="bold" />
            </TouchableOpacity>

            <Text className="font-openBold text-lg text-zinc-900">
              {repetitions}
            </Text>
            <TouchableOpacity
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 p-2"
              activeOpacity={0.7}
              onPress={() => setRepetitions(repetitions + 1)}
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
