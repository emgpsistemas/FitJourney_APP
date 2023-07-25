import { View } from 'react-native';

interface ModalHeaderProps {
  children: React.ReactNode;
}

export function ModalHeader({ children }: ModalHeaderProps) {
  return (
    <View className="relative flex h-14 w-full items-center justify-center rounded-t-xl bg-yellow-400">
      {children}
    </View>
  );
}
