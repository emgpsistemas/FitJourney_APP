import { InputLabel } from "./InputLabel";
import { InputRoot } from "./InputRoot";
import { InputSeachIcon } from "./InputSearchIcon";
import { InputText } from "./InputText";

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Text: InputText,
  SearchIcon: InputSeachIcon,
};

// import { TextInputProps } from 'react-native';
// import {
//   TextInputMaskOptionProp,
//   TextInputMaskTypeProp,
// } from 'react-native-masked-text';

// export interface InputProps extends TextInputProps {
//   label: string;
//   required?: boolean;
//   maskedInput?: boolean;
//   maskType?: TextInputMaskTypeProp;
//   maskOptions?: TextInputMaskOptionProp;
// }

// import { Text, TextInput, View } from 'react-native';
// import { TextInputMask } from 'react-native-masked-text';

// export function Input({
//   label,
//   required,
//   maskedInput = false,
//   maskType = 'custom',
//   maskOptions,
//   ...rest
// }: InputProps) {
//   return (
//     <View className="flex flex-col">
//       <View className="flex flex-row gap-1">
//         {required ? (
//           <Text className="font-openBold text-sm leading-4 text-red-600">
//             *
//           </Text>
//         ) : null}
//         <Text className="font-openBold text-xs leading-4 text-zinc-900">
//           {label.toLocaleUpperCase()}
//         </Text>
//       </View>
//       {maskedInput ? (
//         <TextInputMask
//           type={maskType}
//           options={maskOptions}
//           className="m-0 h-14 rounded-lg bg-white px-5 py-2 font-openSemibold"
//           {...rest}
//         />
//       ) : (
//         <TextInput
//           className="m-0 h-14 rounded-lg bg-white px-5 py-2 font-openSemibold"
//           placeholder="Digite"
//           {...rest}
//         />
//       )}
//     </View>
//   );
// }
