import { CaretRight } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOutUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import FormSVG from '../../../assets/images/svg/form.svg';
import { StepInfo } from '../../../components/StepInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { Input } from '../../../components/ui/Input';
import { useStep } from '../../../hooks/useStep';
import { toastConfig } from '../../../lib/toast/config';

function StepName() {
  const {
    nextStep,
    dispatchUserInfo,
    userInfoState: { name },
  } = useStep();

  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const keyboardDidShow = () => {
    setIsKeyboardActive(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardActive(false);
  };

  function handleKeyboard() {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }

  const handleNextStep = () => {
    Toast.show({
      type: 'error',
      text1: 'Algo deu errado :(',
      text2: 'Adicione seu nome para continuar',
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
    });
    if (name === '') {
    } else {
      nextStep();
    }
  };

  useEffect(() => {
    handleKeyboard();
  }, [Keyboard]);

  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between bg-neutral-50 px-5 py-10">
      <StepInfo>1</StepInfo>
      <View className="mt-8 flex-1">
        <View>
          {isKeyboardActive ? null : (
            <Animated.View
              className="space-y-3"
              entering={FadeIn}
              exiting={FadeOutUp}
            >
              <Text className="text-center font-openBold text-lg text-zinc-900">
                Nos conte um pouco mais sobre você
              </Text>
              <Text className="text-center font-openBold text-sm text-zinc-900">
                Para te fornecer uma melhor experiência, precisamos saber qual é
                o seu nome:
              </Text>
            </Animated.View>
          )}
        </View>
        <View className="flex-1 items-center justify-center">
          {isKeyboardActive ? null : (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOutUp}
              className={'w-full items-center justify-center'}
            >
              <FormSVG width={'70%'} />
            </Animated.View>
          )}
          <View className="mt-10 w-full">
            <Input
              value={name}
              onChangeText={(name) =>
                dispatchUserInfo({ type: 'SET_NAME', payload: name })
              }
              label="NOME"
            />
          </View>
        </View>
      </View>
      <View className="w-1/2 self-end">
        <FitButton.Root variant="primary" onPress={handleNextStep}>
          <FitButton.Text>Próximo</FitButton.Text>
          <FitButton.Icon icon={CaretRight} />
        </FitButton.Root>
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

export default StepName;
