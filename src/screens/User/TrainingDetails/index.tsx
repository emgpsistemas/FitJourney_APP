import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';

export function TrainingDetails() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <SafeAreaView className="flex flex-1 bg-red-200">
      <Text>{id}</Text>
    </SafeAreaView>
  );
}
