import { CaretLeft, CaretRight } from 'phosphor-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from 'tailwindcss/colors';
import LinesSVG from '../../../assets/lines.svg';
import { StepInfo } from '../../../components/StepInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { IconButton } from '../../../components/ui/IconButton';
import { useStep } from '../../../hooks/useStep';

import Toast from 'react-native-toast-message';
import { InvisibleNumberInput } from '../../../components/ui/InvisibleInput';
import { toastConfig } from '../../../lib/toast/config';
import { handleNumberChange } from '../../../utils/HandleNumberInput';

function StepHeight() {
  const {
    nextStep,
    previousStep,
    dispatchUserInfo,
    userInfoState: { height },
  } = useStep();

  const handleNextStep = () => {
    Toast.show({
      type: 'error',
      text1: 'Algo deu errado :(',
      text2: 'Insira o sua altura para continuar',
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
    });
    if (height === 0) {
    } else {
      nextStep();
    }
  };

  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between bg-neutral-50 px-5 py-10">
      <StepInfo>5</StepInfo>
      <View className="mt-8 flex-1">
        <View className="space-y-3">
          <Text className="text-center font-openBold text-lg text-zinc-900">
            Qual é a sua altura?
          </Text>
        </View>
        <View className="flex-1 items-center justify-center space-y-10">
          <InvisibleNumberInput
            label={'cm'}
            onChangeText={(height) =>
              handleNumberChange(height, dispatchUserInfo, 'SET_HEIGHT')
            }
            value={String(height)}
            maxLength={3}
            placeholder="0"
          />
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
          <FitButton.Root variant="primary" onPress={handleNextStep}>
            <FitButton.Text>Próximo</FitButton.Text>
            <FitButton.Icon icon={CaretRight} />
          </FitButton.Root>
        </View>
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

export default StepHeight;
