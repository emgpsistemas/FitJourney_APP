import { Text } from 'react-native';

interface StepInfoProps {
  children: React.ReactNode;
}
export function StepInfo({ children }: StepInfoProps) {
  return (
    <Text className="text-center font-openBold text-4xl text-zinc-900">
      {children}/6
    </Text>
  );
}
