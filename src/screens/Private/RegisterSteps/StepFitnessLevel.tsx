import { CaretLeft, CaretRight } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from 'tailwindcss/colors';
import { StepInfo } from '../../../components/StepInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { IconButton } from '../../../components/ui/IconButton';
import { FitnessLevel } from '../../../contexts/RegisterUserInfo';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';
import { useStep } from '../../../hooks/useStep';
import { storage } from '../../../lib/mmkv/storage';
import { FitJourneyUser } from '../../../utils/FormatUserToAddToFirestore';

function StepFitnessLevel() {
  const [storageUser, setStorageUser] = useState({} as FitJourneyUser);
  const { getUserFromFirestore, user } = useFirebaseAuth();
  const { previousStep, dispatchUserInfo, userInfoState, onConfirm } =
    useStep();
  const width = Dimensions.get('window').width;
  const options: FitnessLevel[] = [
    'Não sei',
    'Iniciante',
    'Intermediário',
    'Avançado',
    'Atleta',
  ];

  async function handleSubmit() {
    try {
      const fieldsToUpdate: FitJourneyUser = {
        ...storageUser,
        uid: user ? user.uid : storageUser.uid,
        age: String(userInfoState.age),
        weight: String(userInfoState.weight),
        height: String(userInfoState.height),
        gender: userInfoState.gender,
        goal: userInfoState.goal,
        fitnessLevel: userInfoState.fitnessLevel,
        displayName: userInfoState.name,
        isBasicInfoCompleted: true,
      };
      await onConfirm(fieldsToUpdate);
      await getUserFromFirestore(fieldsToUpdate);
    } catch (error) {
      console.error('handleSubmit function error: ', error);
    }
  }

  function getUserFromStorage() {
    const storageUser = storage.getString('UserInfo');
    if (storageUser) {
      const jsonUser: FitJourneyUser = JSON.parse(storageUser);
      setStorageUser(jsonUser);
    }
  }

  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between bg-neutral-50 px-5 py-10">
      <StepInfo>7</StepInfo>
      <View className="mt-8 flex-1">
        <View className="space-y-3">
          <Text className="text-center font-openBold text-lg text-zinc-900">
            Atualmente, como você se considera fisicamente?
          </Text>
        </View>
        <View className="flex-1 items-center justify-center space-y-10">
          <View className="relative z-50 max-h-[350px]">
            <View className="absolute left-[22%] top-[36%] z-0 h-20 w-60 border-b-4 border-t-4 border-yellow-400" />
            <Carousel
              data={options}
              onSnapToItem={(item) => {
                const selectedLevel = options[item];
                dispatchUserInfo({
                  type: 'SET_FITNESS_LEVEL',
                  payload: selectedLevel,
                });
              }}
              autoPlay={false}
              loop={true}
              vertical={true}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 1,
                parallaxAdjacentItemScale: 0.55,
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
              renderItem={({ item }) => {
                return (
                  <View className="z-50 flex h-20 items-center justify-center">
                    <Text className="font-openSemibold text-3xl text-zinc-900">
                      {item}
                    </Text>
                  </View>
                );
              }}
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
          <FitButton.Root variant="primary" onPress={() => handleSubmit()}>
            <FitButton.Text>Finalizar</FitButton.Text>
            <FitButton.Icon icon={CaretRight} />
          </FitButton.Root>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default StepFitnessLevel;
