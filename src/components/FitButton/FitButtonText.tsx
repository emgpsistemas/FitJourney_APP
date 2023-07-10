import { Text } from 'react-native';

interface FitButtonTextProps {
  content: string;
}

function FitButtonText({ content }: FitButtonTextProps) {
  return <Text className="flex px-2 font-openBold text-base">{content}</Text>;
}

export default FitButtonText;
