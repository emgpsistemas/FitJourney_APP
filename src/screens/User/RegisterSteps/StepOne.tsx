import { CaretRight } from 'phosphor-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StepInfo } from '../../../components/StepInfo';
import { FitButton } from '../../../components/ui/FitButton';

function StepOne() {
  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between bg-neutral-50 px-5 py-10">
      <StepInfo>1</StepInfo>
      <View className="mt-8 flex-1">
        <View className="space-y-3">
          <Text className="text-center font-openBold text-lg text-zinc-900">
            Nos conte um pouco mais sobre você
          </Text>
          <Text className="text-center font-openBold text-sm text-zinc-900">
            Para te fornecer uma melhor experiência, precisamos saber o seu
            gênero:
          </Text>
        </View>
        <View className="flex-1 items-center justify-center space-y-10">
          <View className="h-[140px] w-[140px] rounded-full bg-red-500"></View>
          <View className="h-[140px] w-[140px] rounded-full bg-red-500"></View>
        </View>
      </View>
      <View className="w-1/2 self-end">
        <FitButton.Root variant="primary" onPress={() => {}}>
          <FitButton.Text>Próximo</FitButton.Text>
          <FitButton.Icon icon={CaretRight} />
        </FitButton.Root>
      </View>
    </SafeAreaView>
  );
}

export default StepOne;
