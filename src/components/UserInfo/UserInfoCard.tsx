import { View } from 'react-native';

interface UserInfoCardProps {
  children: React.ReactNode;
}

export function UserInfoCard({ children }: UserInfoCardProps) {
  return <View className="flex flex-col p-5">{children}</View>;
}
