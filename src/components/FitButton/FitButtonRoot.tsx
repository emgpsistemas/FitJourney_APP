import clsx from 'clsx';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface FitButtonRootProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant: 'primary' | 'outline' | 'ghost';
}

function FitButtonRoot({ children, variant, ...rest }: FitButtonRootProps) {
  return (
    <TouchableOpacity
      style={{ gap: 8 }}
      className={clsx(
        'flex w-full flex-row items-center justify-center rounded-full p-4',
        {
          ['bg-yellow-400']: variant === 'primary',
          ['border-2 border-yellow-400']: variant === 'outline',
          ['bg-transparent']: variant === 'ghost',
        },
      )}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

export default FitButtonRoot;
