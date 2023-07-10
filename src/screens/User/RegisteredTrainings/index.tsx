import { Plus } from 'phosphor-react-native';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { FitButton } from '../../../components/FitButton';
import { TrainingCard } from '../../../components/TrainingCard';

export default function RegisteredTrainings() {
  const mock = [
    {
      id: 1,
      name: 'Treino A',
      muscleGroups: ['Peito', 'Bíceps'],
    },
    { id: 2, name: 'Treino B', muscleGroups: ['Costas', 'Tríceps'] },
    { id: 3, name: 'Treino C', muscleGroups: ['Ombro', 'Abdômen'] },
    { id: 4, name: 'Treino D', muscleGroups: ['Pernas', 'Panturrilhas'] },
    { id: 5, name: 'Treino E', muscleGroups: ['Glúteos', 'Abdômen'] },
    { id: 6, name: 'Treino F', muscleGroups: ['Corpo Inteiro', 'Cardio'] },
  ];

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-16">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={mock}
        renderItem={({ item, index }) => (
          <TrainingCard key={`${index}-${item.name}`} training={item} />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={() => (
          <Text className="mb-10 font-openBold text-2xl text-zinc-900">
            Treinos cadastrados:
          </Text>
        )}
        ListFooterComponent={() => (
          <View className="py-7">
            <FitButton.Root variant="primary" onPress={() => {}}>
              <FitButton.Icon icon={Plus} />
              <FitButton.Text content="Cadastrar Treino" />
            </FitButton.Root>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
