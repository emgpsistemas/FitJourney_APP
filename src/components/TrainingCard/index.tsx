import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { CompleteTraining } from '../../contexts/Trainings/Trainings';
import { MuscleGroupTag } from '../MuscleGroupTag';

interface TrainingCardProps extends TouchableOpacityProps {
  training: CompleteTraining;
}

export function TrainingCard({ training }: TrainingCardProps) {
  const { name, muscle_groups, training_id } = training;
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      className={clsx(
        'flex min-h-[100px] w-full flex-col justify-between rounded-xl border-l-[16px] border-gray-500 bg-white px-6 py-4',
        {
          'border-yellow-400': name === 'Treino A',
          'border-rose-500': name === 'Treino B',
          'border-lime-500': name === 'Treino C',
          'border-cyan-500': name === 'Treino D',
          'border-purple-500': name === 'Treino E',
        },
      )}
      activeOpacity={0.7}
      onPress={() =>
        navigate('TrainingDetails', {
          id: training_id,
        })
      }
    >
      <Text className="font-openBold text-lg text-zinc-900">{name}</Text>
      <View
        className="flex w-full flex-row flex-wrap"
        style={{ rowGap: 4, columnGap: 8 }}
      >
        {muscle_groups.map((muscleGroup, index) => (
          <MuscleGroupTag key={`${index}-${muscleGroup}`} name={muscleGroup} />
        ))}
      </View>
    </TouchableOpacity>
  );
}
