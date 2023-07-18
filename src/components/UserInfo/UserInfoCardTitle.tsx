import { Text } from 'react-native';

interface UserInfoCardTitleProps {
  children: React.ReactNode;
}

export function UserInfoCardTitle({ children }: UserInfoCardTitleProps) {
  return (
    <Text className="font-openNormal text-sm text-zinc-900">{children}</Text>
  );
}
