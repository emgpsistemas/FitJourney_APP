import { Plus } from 'phosphor-react-native';
import { FlatList, Text, View } from 'react-native';

import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrainingCard } from '../../../components/TrainingCard';
import { FitButton } from '../../../components/ui/FitButton';
import { useTrainings } from '../../../hooks/useTrainings';

export default function RegisteredTrainings() {
  const navigation = useNavigation();
  const { allTrainings, getTrainingsCollection } = useTrainings();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      getTrainingsCollection();
    }, []),
  );

  if (!isFocused) {
    return <></>;
  }

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-5">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={allTrainings.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })}
        renderItem={({ item, index }) => {
          return <TrainingCard key={`${index}-${item.name}`} training={item} />;
        }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={() => (
          <Text className="mb-10 font-openBold text-2xl text-zinc-900">
            Treinos cadastrados:
          </Text>
        )}
        ListFooterComponent={() => (
          <View className="py-7">
            <FitButton.Root
              variant="primary"
              onPress={() => navigation.navigate('RegisterNewTraining')}
            >
              <FitButton.Icon icon={Plus} />
              <FitButton.Text>Cadastrar Treino</FitButton.Text>
            </FitButton.Root>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
