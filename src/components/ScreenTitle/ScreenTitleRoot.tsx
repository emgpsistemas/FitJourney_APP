import clsx from 'clsx';
import { View } from 'react-native';

interface ScreenTitleProps {
  children: React.ReactNode;
  alignment?: 'left' | 'center';
}

export function ScreenTitleRoot({
  children,
  alignment = 'center',
}: ScreenTitleProps) {
  return (
    <View
      className={clsx('relative flex h-10 w-full flex-row items-center', {
        'justify-start': alignment === 'left',
        'justify-center': alignment === 'center',
      })}
    >
      {children}
    </View>
  );
}
