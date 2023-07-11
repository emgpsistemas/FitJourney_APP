import { useRoute } from '@react-navigation/native';
import clsx from 'clsx';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { TrainingInfo } from '../../../components/TrainingInfo';

export function TrainingDetails() {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const training = {
    name: 'Treino A',
  };

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
      <ScrollView className="flex flex-1 pt-10">
        <TrainingInfo />
      </ScrollView>
    </SafeAreaView>
  );
}
