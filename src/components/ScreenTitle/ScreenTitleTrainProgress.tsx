import { Text } from 'react-native';

interface ScreenTitleTrainProgressProps {
  children: React.ReactNode;
}

export function ScreenTitleTrainProgress({
  children,
}: ScreenTitleTrainProgressProps) {
  return (
    <Text className="absolute right-0 font-openBold text-2xl text-zinc-900">
      {children}
    </Text>
  );
}
