import { IconProps, X } from 'phosphor-react-native';
import { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

interface ModalCloseButtonProps extends IconProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}

export function ModalCloseButton({ onClose, ...rest }: ModalCloseButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => onClose(false)}
      className="absolute right-3 top-3 z-50 flex h-6 w-6 items-center justify-center rounded-full"
      activeOpacity={0.7}
    >
      <X size={20} color={colors.zinc[900]} weight={'bold'} {...rest} />
    </TouchableOpacity>
  );
}
