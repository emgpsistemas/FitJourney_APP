import clsx from 'clsx';
import { Text, TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
}

import { TextInput, View } from 'react-native';

export function InvisibleNumberInput({ label, ...rest }: InputProps) {
  return (
    <View className="relative -mb-8 flex flex-row items-end justify-center">
      <TextInput
        keyboardType="numeric"
        className="relative flex h-16 w-24 items-end justify-center text-center font-openSemibold text-6xl text-zinc-900"
        {...rest}
      />
      {label ? (
        <Text
          className={clsx(
            'absolute pb-2 font-openNormal text-base text-zinc-900',
            {
              '-right-8': label === 'anos' || label === 'cm',
              '-right-5': label === 'kg',
            },
          )}
        >
          {label}
        </Text>
      ) : null}
    </View>
  );
}
