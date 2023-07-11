import clsx from 'clsx';
import { Check } from 'phosphor-react-native';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import colors from 'tailwindcss/colors';

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function Checkbox({ checked = false, title, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mb-2.5 flex-row items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500"
        >
          <Check size={20} color={colors.white} weight="bold" />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 rounded-lg border-2 border-zinc-200 bg-zinc-100" />
      )}

      <Text className={clsx(`ml-3 font-openNormal text-base text-zinc-900`)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
