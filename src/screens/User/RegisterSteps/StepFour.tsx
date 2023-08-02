import { CaretLeft, CaretRight } from 'phosphor-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StepInfo } from '../../../components/StepInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { useStep } from '../../../hooks/useStep';

function StepFour() {
  const { nextStep, previousStep } = useStep();
  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between bg-neutral-50 px-5 py-10">
      <StepInfo>4</StepInfo>
      <View className="mt-8 flex-1">
        <View className="space-y-3">
          <Text className="text-center font-openBold text-lg text-zinc-900">
            Qual é a sua altura?
          </Text>
        </View>
        <View className="flex-1 items-center justify-center space-y-10"></View>
      </View>
      <View className="flex flex-row items-center justify-between">
        <View className="w-1/2 self-end">
          <FitButton.Root variant="outline" onPress={previousStep}>
            <FitButton.Icon icon={CaretLeft} />
            <FitButton.Text>Voltar</FitButton.Text>
          </FitButton.Root>
        </View>
        <View className="w-1/2 self-end">
          <FitButton.Root variant="primary" onPress={nextStep}>
            <FitButton.Text>Próximo</FitButton.Text>
            <FitButton.Icon icon={CaretRight} />
          </FitButton.Root>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default StepFour;
