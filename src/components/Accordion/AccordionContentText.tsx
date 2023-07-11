import { Text } from 'react-native';

interface AccordionContentTextProps {
  children: React.ReactNode;
}

function AccordionContentText({ children }: AccordionContentTextProps) {
  return (
    <Text className="font-openRegular text-xs text-zinc-900">{children}</Text>
  );
}

export default AccordionContentText;
