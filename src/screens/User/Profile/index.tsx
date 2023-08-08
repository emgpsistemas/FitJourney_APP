import { useNavigation } from '@react-navigation/native';
import { PencilSimple } from 'phosphor-react-native';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoutButton } from '../../../components/LogoutButton';
import { ProfilePicture } from '../../../components/ProfilePicture';
import { UserInfo } from '../../../components/UserInfo';
import { FitButton } from '../../../components/ui/FitButton';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';

const userInfo = {
  totalTrainings: 212,
  memberSince: new Date('2022-08-22').toISOString(),
  registerInfo: [
    {
      title: 'Gênero',
      content: 'Masculino',
    },
    {
      title: 'Idade',
      content: '27 Anos',
    },
    {
      title: 'Peso',
      content: '72 Kg',
    },
    {
      title: 'Altura',
      content: '1,82 m',
    },
    {
      title: 'Objetivo',
      content: 'Hipertrofia',
    },
    {
      title: 'Condicionamento Físico',
      content: 'Intermediário',
    },
  ],
};

export default function Profile() {
  const { navigate } = useNavigation();
  const { user } = useFirebaseAuth();

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-7 flex flex-row items-center justify-between">
          <Text className="font-openBold text-2xl text-zinc-900">
            Meu Perfil
          </Text>
          <View className="w-20 self-end">
            <LogoutButton />
          </View>
        </View>
        <View>
          <ProfilePicture />
          <Text className="text-center font-openBold text-xl">
            {user?.displayName}
          </Text>
        </View>
        <View className="flex w-full flex-row items-center justify-center space-x-11 py-7">
          <View className="flex flex-col items-center justify-center">
            <Text className="font-openNormal text-sm text-zinc-600">
              Total de Treinos
            </Text>
            <Text className="font-openSemibold text-base text-zinc-900">
              {userInfo.totalTrainings}
            </Text>
          </View>

          <View className="flex flex-col items-center justify-center">
            <Text className="font-openNormal text-sm text-zinc-600">
              Membro desde
            </Text>
            <Text className="font-openSemibold text-base text-zinc-900">
              {new Date(userInfo.memberSince).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
              })}
            </Text>
          </View>
        </View>

        <UserInfo.Root>
          {userInfo.registerInfo.map((item, index) => (
            <View key={`${item.title}-${index}`}>
              <UserInfo.Card>
                <UserInfo.CardTitle>{item.title}</UserInfo.CardTitle>
                <UserInfo.CardContent>{item.content}</UserInfo.CardContent>
              </UserInfo.Card>
              {index !== userInfo.registerInfo.length - 1 ? (
                <UserInfo.Divider />
              ) : null}
            </View>
          ))}
        </UserInfo.Root>

        <View className="py-7">
          <FitButton.Root
            variant="primary"
            onPress={() => navigate('EditProfile')}
          >
            <FitButton.Icon icon={PencilSimple} />
            <FitButton.Text>Editar Perfil</FitButton.Text>
          </FitButton.Root>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
