import { View } from 'react-native';

interface AccordionContetProps {
  children: React.ReactNode;
}

function AccordionContent({ children }: AccordionContetProps) {
  return <View className="mt-3">{children}</View>;
}

export default AccordionContent;
