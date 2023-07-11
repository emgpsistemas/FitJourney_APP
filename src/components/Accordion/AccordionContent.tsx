import { View } from 'react-native';

interface AccordionContetProps {
  children: React.ReactNode;
}

function AccordionContet({ children }: AccordionContetProps) {
  return <View className="mt-3">{children}</View>;
}

export default AccordionContet;
