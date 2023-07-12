import { Text, View } from 'react-native';

interface MuscleGroupTagProps {
  name: string;
}
export function MuscleGroupTag({ name }: MuscleGroupTagProps) {
  return (
    <View className="flex h-fit items-center justify-center rounded-full bg-zinc-700">
      <Text className="p-2 font-openMedium text-xs text-white">{name}</Text>
    </View>
  );
}
