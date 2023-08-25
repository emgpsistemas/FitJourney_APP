import {
  CaretLeft,
  CaretRight,
  GenderFemale,
  GenderMale,
} from 'phosphor-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import colors from 'tailwindcss/colors';
import { GenderButton } from '../../../components/GenderButton';
import { StepInfo } from '../../../components/StepInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { IconButton } from '../../../components/ui/IconButton';
import { useStep } from '../../../hooks/useStep';
import { toastConfig } from '../../../lib/toast/config';

function StepGender() {
  const {
    previousStep,
    nextStep,
    dispatchUserInfo,
    userInfoState: { gender },
  } = useStep();

  const handleNextStep = () => {
    Toast.show({
      type: 'error',
      text1: 'Algo deu errado :(',
      text2: 'Selecione uma opção para continuar',
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
    });
    if (gender === '') {
    } else {
      nextStep();
    }
  };

  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between bg-neutral-50 px-5 py-10">
      <StepInfo>2</StepInfo>
      <View className="mt-8 flex-1">
        <View className="space-y-3">
          <Text className="text-center font-openBold text-lg text-zinc-900">
            Qual é o seu gênero?
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

export default StepGender;
