import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export function IconButton({ children, ...rest }: IconButtonProps) {
  return (
    <TouchableOpacity
      className={
        'flex flex-row items-center justify-center rounded-lg border-2 border-yellow-400 p-1'
      }
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}
