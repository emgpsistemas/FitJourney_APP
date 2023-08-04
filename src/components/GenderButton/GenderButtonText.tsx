import { Text } from 'react-native';

interface GenderButtonTextProps {
  children: string;
}

export function GenderButtonText({ children }: GenderButtonTextProps) {
  return (
    <Text className="mt-2 font-openNormal text-sm text-zinc-900">
      {children}
    </Text>
  );
}
