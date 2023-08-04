import { Text, View } from 'react-native';

interface Exercise {
  id: number;
  name: string;
  description: string;
}

interface AccordionExerciseProps {
  exercise: Exercise;
}

function AccordionExercise({ exercise }: AccordionExerciseProps) {
  return (
    <View className="flex flex-row space-x-2">
      <Text className="font-openSemibold text-base text-zinc-900">
        {exercise.name}
      </Text>
    </View>
  );
}

export default AccordionExercise;
