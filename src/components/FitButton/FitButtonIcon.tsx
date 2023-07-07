import { IconProps } from 'phosphor-react-native';
import { ElementType } from 'react';

interface FitButtonIconProps extends IconProps {
  icon: ElementType;
}

function FitButtonIcon({ icon: Icon, ...rest }: FitButtonIconProps) {
  return (
    <Icon className={'flex h-6 w-6 text-zinc-900'} weight={'bold'} {...rest} />
  );
}

export default FitButtonIcon;
