import { Check } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import colors from 'tailwindcss/colors';

interface CheckboxToggleProps extends TouchableOpacityProps {
  checked: boolean;
}

function CheckboxToggle({ checked, ...rest }: CheckboxToggleProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
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
    </TouchableOpacity>
  );
}

export default CheckboxToggle;
