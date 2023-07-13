import { Text, View } from "react-native";

interface InputLabelProps {
  required?: boolean;
  label: string;
}

export function InputLabel({ required, label }: InputLabelProps) {
  return (
    <View className="flex flex-row gap-1">
      {required ? (
        <Text className="font-openBold text-sm leading-4 text-red-600">*</Text>
      ) : null}
      <Text className="font-openBold text-xs leading-4 text-zinc-900">
        {label.toLocaleUpperCase()}
      </Text>
    </View>
  );
}
