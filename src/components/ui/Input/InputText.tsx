import { TextInputProps } from "react-native";

import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from "react-native-masked-text";

export interface InputProps extends TextInputProps {
  maskedInput?: boolean;
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
}

import { TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export function InputText({
  maskedInput = false,
  maskType = "custom",
  maskOptions,
  ...rest
}: InputProps) {
  return (
    <>
      {maskedInput ? (
        <TextInputMask
          type={maskType}
          options={maskOptions}
          className="m-0 h-14 rounded-lg bg-neutral-100 px-5 py-2 font-openSemibold"
          {...rest}
        />
      ) : (
        <TextInput
          className="m-0 h-14 rounded-lg bg-neutral-100 px-5 py-2 font-openSemibold"
          placeholder="Digite"
          {...rest}
        />
      )}
    </>
  );
}
