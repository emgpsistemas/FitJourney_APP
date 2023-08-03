import { CaretLeft, CaretRight } from 'phosphor-react-native';
import { memo, useCallback } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from 'tailwindcss/colors';
import { StepInfo } from '../../../components/StepInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { IconButton } from '../../../components/ui/IconButton';
import { useStep } from '../../../hooks/useStep';
import { numberArrayGenerator } from '../../../utils/NumberArrayGenerator';

function StepTwo() {
  const {
    nextStep,
    previousStep,
    dispatchUserInfo,
    userInfoState: { age },
  } = useStep();

  const width = Dimensions.get('window').width;

  const renderItem = useCallback(
    ({ index }: { index: number }) => (
      <View className="z-50 flex h-20 items-center justify-center">
        <Text className="font-openBold text-[58px] text-zinc-900">{index}</Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between bg-neutral-50 px-5 py-10">
      <StepInfo>2</StepInfo>
      <View className="mt-8 flex-1">
        <View className="space-y-3">
          <Text className="text-center font-openBold text-lg text-zinc-900">
            Qual é a sua idade?
          </Text>
        </View>
        <View className="flex-1 items-center justify-center space-y-10">
          <View className="relative z-50 max-h-[350px]">
            <View className="absolute left-[38%] top-[36%] z-0 h-20 w-32 border-b-4 border-t-4 border-yellow-400" />
            <Carousel
              data={numberArrayGenerator(0, 90)}
              onSnapToItem={(age) =>
                dispatchUserInfo({ type: 'SET_AGE', payload: age })
              }
              defaultIndex={age}
              autoPlay={false}
              loop={true}
              vertical={true}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 1,
                parallaxAdjacentItemScale: 0.6,
                parallaxScrollingOffset: 30,
              }}
              width={width}
              height={width / 4}
              scrollAnimationDuration={100}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              renderItem={renderItem}
            />
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
          <FitButton.Root variant="primary" onPress={nextStep}>
            <FitButton.Text>Próximo</FitButton.Text>
            <FitButton.Icon icon={CaretRight} />
          </FitButton.Root>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default memo(StepTwo);
