import { Text } from 'react-native';

interface AccordionContentTitleProps {
  children: React.ReactNode;
}

function AccordionContentTitle({ children }: AccordionContentTitleProps) {
  return (
    <Text className="mb-2 font-openBold text-xs text-zinc-900">{children}</Text>
  );
}

export default AccordionContentTitle;
