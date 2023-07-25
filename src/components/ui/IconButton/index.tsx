import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export function IconButton({ children, ...rest }: IconButtonProps) {
  return (
    <TouchableOpacity
      className={twMerge(
        'flex flex-row items-center justify-center rounded-lg border-2 border-yellow-400 p-1',
        rest.className,
      )}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}
