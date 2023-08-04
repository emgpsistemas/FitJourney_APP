import { Text, TextInput, TextInputProps, View } from 'react-native';

export interface TextAreaProps extends TextInputProps {
  label: string;
  required?: boolean;
}

export function TextArea({ label, required, ...rest }: TextAreaProps) {
  return (
    <>
      <View className="flex flex-row gap-1">
        {required ? (
          <Text className="font-openBold text-sm leading-4 text-red-600">
            *
          </Text>
        ) : null}
        <Text className="font-openBold text-sm leading-4 text-neutral-900">
          {label.toLocaleUpperCase()}
        </Text>
      </View>
      <TextInput
        placeholder="Digite"
        multiline={true}
        textAlignVertical="top"
        numberOfLines={6}
        className="font-poppinsSemibold m-0 rounded-lg bg-neutral-100 px-5 py-4"
        {...rest}
      />
    </>
  );
}
