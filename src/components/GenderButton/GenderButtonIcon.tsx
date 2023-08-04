import { IconProps } from 'phosphor-react-native';
import { ElementType } from 'react';

interface FitButtonIconProps extends IconProps {
  icon: ElementType;
}

export function GenderButtonIcon({ icon: Icon, ...rest }: FitButtonIconProps) {
  return (
    <Icon
      className={'flex text-zinc-900'}
      size={48}
      weight={'bold'}
      {...rest}
    />
  );
}
