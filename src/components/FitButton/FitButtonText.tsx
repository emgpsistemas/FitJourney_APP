import { Text } from 'react-native';

interface FitButtonTextProps {
  content: string;
}

function FitButtonText({ content }: FitButtonTextProps) {
  return <Text className="flex font-openBold text-base">{content}</Text>;
}

export default FitButtonText;
