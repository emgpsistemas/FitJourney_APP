import { useNavigation } from '@react-navigation/native';
import { Plus } from 'phosphor-react-native';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { FitButton } from '../../../components/ui/FitButton';

export default function RegisteredExercises() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-16">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[]}
        renderItem={({ item, index }) => {
          return null;
        }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={() => (
          <Text className="mb-10 font-openBold text-2xl text-zinc-900">
            Exercícios Cadastrados:
          </Text>
        )}
        ListFooterComponent={() => (
          <View className="py-7">
            <FitButton.Root
              variant="primary"
              onPress={() => navigate('RegisterExercise')}
            >
              <FitButton.Icon icon={Plus} />
              <FitButton.Text>Cadastrar Exercício</FitButton.Text>
            </FitButton.Root>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
