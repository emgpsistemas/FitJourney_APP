import { PencilSimple } from 'phosphor-react-native';
import { Image, TouchableOpacity, View } from 'react-native';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

export function ProfilePicture() {
  const { user } = useFirebaseAuth();
  return (
    <View className="relative h-28 w-28 self-center rounded-full border-4 border-yellow-400">
      <Image
        source={{
          uri:
            user?.photoURL ||
            'https://api-private.atlassian.com/users/d533a32ca5379ef2482c4f6a780e3b20/avatar',
        }}
        className="h-full w-full rounded-full"
      />
      {/* // TODO: Transformar o TouchableOpacity em um componente de modal para editar a imagem do usuário */}
      <TouchableOpacity
        activeOpacity={0.7}
        className="absolute -right-4 bottom-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-yellow-400 bg-white"
      >
        <PencilSimple weight="bold" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
