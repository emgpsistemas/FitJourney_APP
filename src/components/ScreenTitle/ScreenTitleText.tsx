import { Text } from 'react-native';

interface ScreenTitleTextProps {
  children: React.ReactNode;
}

export function ScreenTitleText({ children }: ScreenTitleTextProps) {
  return (
    <Text className="font-openBold text-2xl text-zinc-900">{children}</Text>
  );
}
