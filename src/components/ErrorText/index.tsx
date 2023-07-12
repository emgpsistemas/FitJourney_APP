import { Text, TextProps } from "react-native";

interface ErrorTextProps extends TextProps {
  children: string;
}

export function ErrorText({ children }: ErrorTextProps) {
  return (
    <Text className="font-openNormal text-xs text-red-500">{children}</Text>
  );
}
