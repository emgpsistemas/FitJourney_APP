import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';

export function TrainingDetails() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-16">
      <Text>Teste{id}</Text>
    </SafeAreaView>
  );
}
