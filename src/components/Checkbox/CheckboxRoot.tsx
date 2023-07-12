import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CheckboxRootProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

function CheckboxRoot({ children, ...rest }: CheckboxRootProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mb-2.5 w-full flex-row items-center"
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

export default CheckboxRoot;
