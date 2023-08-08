import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import { Plus } from 'phosphor-react-native';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accordion } from '../../../components/Accordion';
import { DeleteExerciseModal } from '../../../components/DeleteExerciseModal';
import { EditExerciseModal } from '../../../components/EditExerciseModal';
import { FitButton } from '../../../components/ui/FitButton';

const categories = [
  {
    id: 1,
    name: 'Peito',
    exercises: [
      {
        id: 1,
        name: 'Supino Reto',
        description: 'Teste',
      },
      {
        id: 2,
        name: 'Supino Inclinado',
        description: 'Teste',
      },
    ],
  },
  {
    id: 2,
    name: 'Ombros',
    exercises: [
      {
        id: 3,
        name: 'Elevação Lateral',
        description: 'Teste',
      },
    ],
  },
  {
    id: 3,
    name: 'Pernas',
    exercises: [
      {
        id: 4,
        name: 'Leg Press 45º',
        description: 'Teste',
      },
    ],
  },
];

export default function RegisteredExercises() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-5">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          return (
            <Accordion.Root title={item.name}>
              <Accordion.Content>
                {item.exercises.map((exercise, index) => (
                  <View
                    key={`${exercise.id}-${exercise.name}`}
                    className={clsx('flex flex-row items-center', {
                      ['mb-3']: index !== item.exercises.length - 1,
                    })}
                  >
                    <View className="mr-2">
                      <DeleteExerciseModal
                        categoryId={item.id}
                        exerciseId={exercise.id}
                      />
                    </View>
                    <View className="mr-3">
                      <EditExerciseModal
                        exercise={{
                          ...exercise,
                          category: item.name,
                        }}
                      />
                    </View>
                    <Accordion.Exercise exercise={exercise} />
                  </View>
                ))}
              </Accordion.Content>
            </Accordion.Root>
          );
        }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={() => (
          <Text className="mb-10 font-openBold text-2xl text-zinc-900">
            Exercícios Cadastrados:
          </Text>
        )}
        ListFooterComponent={() => (
          <View className="py-7">
            <FitButton.Root
              variant="primary"
              onPress={() => navigate('RegisterExercise')}
            >
              <FitButton.Icon icon={Plus} />
              <FitButton.Text>Cadastrar Exercício</FitButton.Text>
            </FitButton.Root>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
