import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { MuscleGroupTag } from '../MuscleGroupTag';

interface Training {
  id: number;
  name: string;
  muscleGroups: string[];
}

interface TrainingCardProps extends TouchableOpacityProps {
  training: Training;
}

export function TrainingCard({ training }: TrainingCardProps) {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      className={clsx(
        'flex min-h-[100px] w-full flex-col justify-between rounded-xl border-l-[16px] border-gray-500 bg-white px-6 py-4',
        {
          'border-yellow-400': training.name === 'Treino A',
          'border-rose-500': training.name === 'Treino B',
          'border-lime-500': training.name === 'Treino C',
          'border-cyan-500': training.name === 'Treino D',
          'border-purple-500': training.name === 'Treino E',
        },
      )}
      activeOpacity={0.7}
      onPress={() =>
        navigate('TrainingDetails', {
          id: training.id,
        })
      }
    >
      <Text className="font-openBold text-lg text-zinc-900">
        {training.name}
      </Text>
      <View
        className="flex w-full flex-row flex-wrap"
        style={{ rowGap: 4, columnGap: 8 }}
      >
        {training.muscleGroups.map((muscleGroup, index) => (
          <MuscleGroupTag key={`${index}-${muscleGroup}`} name={muscleGroup} />
        ))}
      </View>
    </TouchableOpacity>
  );
}
