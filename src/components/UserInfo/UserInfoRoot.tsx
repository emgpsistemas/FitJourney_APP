import { View } from 'react-native';

interface UserInfoRootProps {
  children: React.ReactNode;
}

export function UserInfoRoot({ children }: UserInfoRootProps) {
  return (
    <View className="flex flex-col rounded-xl bg-zinc-100">{children}</View>
  );
}
