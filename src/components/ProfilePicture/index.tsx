import { PencilSimple } from 'phosphor-react-native';
import { Image, TouchableOpacity, View } from 'react-native';

export function ProfilePicture() {
  return (
    <View className="relative h-28 w-28 self-center rounded-full border-4 border-yellow-400">
      {/* // TODO: Adaptar componente para receber prop com imagem do usuário */}
      <Image
        source={{
          uri: 'https://avatars.githubusercontent.com/u/81588512?s=400&u=d9f97ff4c05c8bea1031fc811e9443705f5ee6c5&v=4',
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
