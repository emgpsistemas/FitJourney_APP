import { View } from 'react-native';

interface ModalBodyProps {
  children: React.ReactNode;
}

export function ModalBody({ children }: ModalBodyProps) {
  return <View className="px-5 py-6">{children}</View>;
}
