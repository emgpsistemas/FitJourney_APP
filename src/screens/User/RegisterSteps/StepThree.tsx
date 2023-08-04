import { CaretLeft, CaretRight } from 'phosphor-react-native';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from 'tailwindcss/colors';
import LinesSVG from '../../../assets/lines.svg';
import { StepInfo } from '../../../components/StepInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { IconButton } from '../../../components/ui/IconButton';
import { useStep } from '../../../hooks/useStep';

function StepThree() {
  const {
    nextStep,
    previousStep,
    dispatchUserInfo,
    userInfoState: { weight },
  } = useStep();
  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between bg-neutral-50 px-5 py-10">
      <StepInfo>3</StepInfo>
      <View className="mt-8 flex-1">
        <View className="space-y-3">
          <Text className="text-center font-openBold text-lg text-zinc-900">
            Qual é o seu peso?
          </Text>
        </View>
        <View className="flex-1 items-center justify-center space-y-10">
          <View className="-mb-8 -mr-5 flex flex-row items-end justify-center">
            <TextInput
              onChangeText={(weight) =>
                dispatchUserInfo({
                  type: 'SET_WEIGHT',
                  payload: Number(weight),
                })
              }
              value={String(weight)}
              placeholder="0"
              keyboardType="numeric"
              className="flex h-16 w-24 items-end justify-center text-center font-openSemibold text-6xl text-zinc-900"
              maxLength={3}
            />
            <Text className="pb-2 font-openNormal text-base text-zinc-900">
              kg
            </Text>
          </View>
          <LinesSVG width={'100%'} />
        </View>
      </View>
      <View className="flex flex-row items-center justify-between">
        <IconButton
          onPress={previousStep}
          className="flex h-14 w-14 flex-row items-center justify-center rounded-full border-2 border-yellow-400 p-1"
        >
          <CaretLeft size={20} weight="bold" color={colors.zinc[900]} />
        </IconButton>
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

export default StepThree;
