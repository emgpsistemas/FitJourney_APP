import { Text } from 'react-native';

interface ModalTitleProps {
  children: React.ReactNode;
}

export function ModalTitle({ children }: ModalTitleProps) {
  return (
    <Text className="font-openBold text-base text-zinc-900">
      {children?.toString().toUpperCase()}
    </Text>
  );
}
