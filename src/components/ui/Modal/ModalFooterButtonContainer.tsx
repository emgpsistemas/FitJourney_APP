import { View } from 'react-native';

interface ModalFooterButtonContainerProps {
  children: React.ReactNode;
}
export function ModalFooterButtonContainer({
  children,
}: ModalFooterButtonContainerProps) {
  return <View className="w-[48%]">{children}</View>;
}
