import clsx from 'clsx';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface FitButtonRootProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant: 'primary' | 'outline' | 'ghost';
}

function FitButtonRoot({ children, variant, ...rest }: FitButtonRootProps) {
  return (
    <TouchableOpacity
      className={clsx(
        'flex w-full flex-row items-center justify-center rounded-full p-3.5',
        {
          ['border-2 border-yellow-400 bg-yellow-400']: variant === 'primary',
          ['border-2 border-yellow-400 bg-white']: variant === 'outline',
          ['border-2 border-transparent bg-transparent']: variant === 'ghost',
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
