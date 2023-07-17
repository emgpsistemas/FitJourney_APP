import { Text, View } from 'react-native';
import { LogoutButton } from '../../../components/LogoutButton';
import { ProfilePicture } from '../../../components/ProfilePicture';

export default function Profile() {
  return (
    <View className="flex flex-1 flex-col bg-neutral-50 px-5 py-10">
      <View className="mb-7 flex flex-row items-center justify-between">
        <Text className="font-openBold text-2xl text-zinc-900">Meu Perfil</Text>
        <View className="w-20 self-end">
          <LogoutButton />
        </View>
      </View>

      <ProfilePicture />
    </View>
  );
}
