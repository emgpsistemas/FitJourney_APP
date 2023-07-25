import { View } from 'react-native';

interface ModalFooterProps {
  children: React.ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <View className="flex w-full flex-row justify-between space-x-3 px-5 pb-5">
      {children}
    </View>
  );
}
