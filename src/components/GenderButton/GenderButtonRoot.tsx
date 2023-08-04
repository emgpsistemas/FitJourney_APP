import clsx from 'clsx';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface GenderButtonRootProps extends TouchableOpacityProps {
  children: React.ReactNode;
  isActive: boolean;
}

export function GenderButtonRoot({
  children,
  isActive,
  ...rest
}: GenderButtonRootProps) {
  return (
    <TouchableOpacity
      className={clsx(
        'flex h-[140px] w-[140px] items-center justify-center rounded-full transition-all',
        {
          'bg-yellow-400': isActive,
          'border-4 border-yellow-400': !isActive,
        },
      )}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}
