import { useNavigation } from '@react-navigation/native';
import { Barbell, ListPlus, UserCircle } from 'phosphor-react-native';
import { ScrollView, Text, View } from 'react-native';
import HomeImageSVG from '../../../assets/images/svg/home.svg';
import { LogoutButton } from '../../../components/LogoutButton';
import { FitButton } from '../../../components/ui/FitButton';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';

export default function Home() {
  const { navigate } = useNavigation();
  const { user } = useFirebaseAuth();

  return (
    <ScrollView className="flex flex-1 flex-col bg-neutral-50 px-5 py-10">
      <View className="w-24 self-end ">
        <LogoutButton />
      </View>
      <View className="mb-10 mt-8">
        <HomeImageSVG width={'100%'} />
      </View>

      {user && user.displayName ? (
        <Text className="text-center font-openMedium text-xl text-zinc-900">
          Olá <Text className="font-openBold">{user?.displayName}</Text>, bem
          vindo!
        </Text>
      ) : (
        <Text className="text-center font-openBold text-xl text-zinc-900">
          O que você deseja fazer?
        </Text>
      )}

      <View className="mt-10 flex flex-1 items-center justify-center space-y-3 ">
        <FitButton.Root
          variant="primary"
          onPress={() => navigate('RegisteredExercices')}
        >
          <FitButton.Icon icon={ListPlus} />
          <FitButton.Text>Exercícios</FitButton.Text>
        </FitButton.Root>

        <FitButton.Root variant="primary" onPress={() => navigate('Profile')}>
          <FitButton.Icon icon={UserCircle} />
          <FitButton.Text>Perfil</FitButton.Text>
        </FitButton.Root>

        <FitButton.Root
          variant="primary"
          onPress={() => navigate('RegisteredTrainings')}
        >
          <FitButton.Icon icon={Barbell} />
          <FitButton.Text>Treinos</FitButton.Text>
        </FitButton.Root>
      </View>
    </ScrollView>
  );
}
