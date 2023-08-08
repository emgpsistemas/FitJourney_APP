import { View } from "react-native";

interface InputRootProps {
  children: React.ReactNode;
}

export function InputRoot({ children }: InputRootProps) {
  return <View className="flex flex-col">{children}</View>;
}
