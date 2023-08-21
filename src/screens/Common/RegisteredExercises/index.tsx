import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import { Plus } from 'phosphor-react-native';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accordion } from '../../../components/Accordion';
import { DeleteExerciseModal } from '../../../components/DeleteExerciseModal';
import { EditExerciseModal } from '../../../components/EditExerciseModal';
import { FitButton } from '../../../components/ui/FitButton';
import { useExercises } from '../../../hooks/useExercises';
import { uniqueID } from '../../../utils/uniqueID';

export default function RegisteredExercises() {
  const { navigate } = useNavigation();
  const { allExercises } = useExercises();

  const categoriesWithExercises = allExercises.map((exercise) => {
    return {
      id: uniqueID(),
      name: exercise.muscle_group,
      exercises: allExercises.filter(
        (exerciseToFilter) =>
          exerciseToFilter.muscle_group === exercise.muscle_group,
      ),
    };
  });

  // Filter the duplicated categories
  const categoriesWithExercisesFiltered = categoriesWithExercises
    .filter(
      (category, index, self) =>
        index ===
        self.findIndex(
          (categoryToFilter) => categoryToFilter.name === category.name,
        ),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-5">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categoriesWithExercisesFiltered}
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
                      <DeleteExerciseModal exerciseId={exercise.id} />
                    </View>
                    <View className="mr-3">
                      <EditExerciseModal
                        exercise={{
                          ...exercise,
                          muscle_group: item.name,
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
