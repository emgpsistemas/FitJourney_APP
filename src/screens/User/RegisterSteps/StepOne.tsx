import { CaretRight, GenderFemale, GenderMale } from 'phosphor-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GenderButton } from '../../../components/GenderButton';
import { StepInfo } from '../../../components/StepInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { useStep } from '../../../hooks/useStep';

function StepOne() {
  const {
    nextStep,
    dispatchUserInfo,
    userInfoState: { gender },
  } = useStep();

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
          <View>
            <GenderButton.Root
              onPress={() =>
                dispatchUserInfo({ type: 'SET_GENDER', payload: 'Masculino' })
              }
              isActive={gender === 'Masculino' ? true : false}
            >
              <GenderButton.Icon icon={GenderMale} />
              <GenderButton.Text>Masculino</GenderButton.Text>
            </GenderButton.Root>
          </View>
          <View>
            <GenderButton.Root
              onPress={() =>
                dispatchUserInfo({ type: 'SET_GENDER', payload: 'Feminino' })
              }
              isActive={gender === 'Feminino' ? true : false}
            >
              <GenderButton.Icon icon={GenderFemale} />
              <GenderButton.Text>Feminino</GenderButton.Text>
            </GenderButton.Root>
          </View>
        </View>
      </View>
      <View className="w-1/2 self-end">
        <FitButton.Root variant="primary" onPress={nextStep}>
          <FitButton.Text>Próximo</FitButton.Text>
          <FitButton.Icon icon={CaretRight} />
        </FitButton.Root>
      </View>
    </SafeAreaView>
  );
}

export default StepOne;
