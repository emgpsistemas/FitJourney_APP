import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { ScreenTitle } from '../../../components/ScreenTitle';

export function TrainingDetails() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-16">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <ScreenTitle.Text>Treino {id}</ScreenTitle.Text>
        <ScreenTitle.TrainProgress>0/10</ScreenTitle.TrainProgress>
      </ScreenTitle.Root>
    </SafeAreaView>
  );
}
