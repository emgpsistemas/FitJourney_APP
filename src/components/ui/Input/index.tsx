import { TextInputProps } from "react-native";
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from "react-native-masked-text";

export interface InputProps extends TextInputProps {
  label: string;
  required?: boolean;
  maskedInput?: boolean;
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
}

import { Text, TextInput, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export function Input({
  label,
  required,
  maskedInput = false,
  maskType = "custom",
  maskOptions,
  ...rest
}: InputProps) {
  return (
    <>
      <View className="flex flex-row gap-1">
        {required ? (
          <Text className="text-status-red font-openBold text-sm leading-4">
            *
          </Text>
        ) : null}
        <Text className="font-openBold text-sm leading-4 text-neutral-900">
          {label.toLocaleUpperCase()}
        </Text>
      </View>
      {maskedInput ? (
        <TextInputMask
          type={maskType}
          options={maskOptions}
          className="font-poppinsSemibold m-0 h-14 rounded-lg bg-neutral-100 px-5 py-2"
          {...rest}
        />
      ) : (
        <TextInput
          className="font-poppinsSemibold m-0 h-14 rounded-lg bg-neutral-100 px-5 py-2"
          placeholder="Digite"
          {...rest}
        />
      )}
    </>
  );
}
