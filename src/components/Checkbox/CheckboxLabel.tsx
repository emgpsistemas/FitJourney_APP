import { Text } from 'react-native';

interface CheckboxLabelProps {
  children: React.ReactNode;
}

function CheckboxLabel({ children }: CheckboxLabelProps) {
  return (
    <Text className="ml-3 font-openNormal text-base text-zinc-900">
      {children}
    </Text>
  );
}

export default CheckboxLabel;
