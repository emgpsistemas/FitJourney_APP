import { Text } from 'react-native';

interface UserInfoCardContentProps {
  children: React.ReactNode;
}

export function UserInfoCardContent({ children }: UserInfoCardContentProps) {
  return (
    <Text className="font-openBold text-base text-zinc-900">{children}</Text>
  );
}
