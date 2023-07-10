import { useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

export function GoBackButton() {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity
      className="absolute left-0 flex w-10 items-center justify-center rounded-full border-2 border-yellow-400 p-2"
      activeOpacity={0.7}
      onPress={() => goBack()}
    >
      <CaretLeft color={colors.zinc[900]} weight={'bold'} size={20} />
    </TouchableOpacity>
  );
}
