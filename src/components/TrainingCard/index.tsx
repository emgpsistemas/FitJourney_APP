import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { MuscleGroupTag } from '../MuscleGroupTag';

interface TrainingCardProps extends TouchableOpacityProps {
  trainingName: string;
  muscleGroups: string[];
}

export function TrainingCard({
  trainingName,
  muscleGroups,
}: TrainingCardProps) {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      className={clsx(
        'flex min-h-[100px] w-full flex-col justify-between rounded-xl border-l-[16px] border-gray-500 bg-white px-6 py-4',
        {
          'border-yellow-400': trainingName === 'Treino A',
          'border-rose-500': trainingName === 'Treino B',
          'border-lime-500': trainingName === 'Treino C',
          'border-cyan-500': trainingName === 'Treino D',
          'border-purple-500': trainingName === 'Treino E',
        },
      )}
      activeOpacity={0.7}
      onPress={() =>
        navigate('TrainingDetails', {
          id: 1,
        })
      }
    >
      <Text className="font-openBold text-lg text-zinc-900">
        {trainingName}
      </Text>
      <View
        className="flex w-full flex-row flex-wrap"
        style={{ rowGap: 4, columnGap: 8 }}
      >
        {muscleGroups.map((muscleGroup, index) => (
          <MuscleGroupTag key={`${index}-${muscleGroup}`} name={muscleGroup} />
        ))}
      </View>
    </TouchableOpacity>
  );
}
