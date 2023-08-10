import { Text } from 'react-native';
import { useStep } from '../../hooks/useStep';

interface StepInfoProps {
  children: React.ReactNode;
}
export function StepInfo({ children }: StepInfoProps) {
  const { maxStep } = useStep();
  return (
    <Text className="text-center font-openBold text-4xl text-zinc-900">
      {children}/{maxStep}
    </Text>
  );
}
