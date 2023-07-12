import { useRoute } from '@react-navigation/native';
import clsx from 'clsx';
import { Check } from 'phosphor-react-native';
import { useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Accordion } from '../../../components/Accordion';
import { Checkbox } from '../../../components/Checkbox';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { TrainingInfo } from '../../../components/TrainingInfo';
import { FitButton } from '../../../components/ui/FitButton';

const exercisesMock = [
  {
    id: 1,
    name: 'Supino Reto',
    description:
      'Deite-se em um banco reto, segure a barra com as mãos na largura dos ombros e afaste os cotovelos até que estejam alinhados com os ombros. Desça a barra até o peito e volte à posição inicial.',
    observations:
      '4 séries de 10 repetições com 1 minuto de descanso entre as séries.',
    series: [
      {
        isChecked: true,
        repetitions: {
          actual: 10,
          lastTraining: 10,
        },
        weight: {
          actual: 20,
          lastTraining: 18,
        },
      },
      {
        isChecked: false,
        repetitions: {
          actual: 0,
          lastTraining: 10,
        },
        weight: {
          actual: 0,
          lastTraining: 18,
        },
      },
      {
        isChecked: false,
        repetitions: {
          actual: 0,
          lastTraining: 10,
        },
        weight: {
          actual: 0,
          lastTraining: 18,
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Supino Declinado',
    description:
      'Deite-se em um banco declinado, segure a barra com as mãos na largura dos ombros e afaste os cotovelos até que estejam alinhados com os ombros. Desça a barra até o peito e volte à posição inicial.',
    observations:
      '4 séries de 10 repetições com 1 minuto de descanso entre as séries.',
    series: [
      {
        isChecked: true,
        repetitions: {
          actual: 10,
          lastTraining: 10,
        },
        weight: {
          actual: 20,
          lastTraining: 18,
        },
      },
      {
        isChecked: false,
        repetitions: {
          actual: 0,
          lastTraining: 10,
        },
        weight: {
          actual: 0,
          lastTraining: 18,
        },
      },
      {
        isChecked: false,
        repetitions: {
          actual: 0,
          lastTraining: 10,
        },
        weight: {
          actual: 0,
          lastTraining: 18,
        },
      },
    ],
  },
];

const training = {
  name: 'Treino A',
};

export function TrainingDetails() {
  const [exercises, setExercises] = useState(exercisesMock);
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-16">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <View
          className={clsx('mr-3 h-4 w-4 rounded-full bg-gray-500', {
            'bg-yellow-400': training.name === 'Treino A',
            'bg-rose-500': training.name === 'Treino B',
            'bg-lime-500': training.name === 'Treino C',
            'bg-cyan-500': training.name === 'Treino D',
            'bg-purple-500': training.name === 'Treino E',
          })}
        />
        <ScreenTitle.Text>Treino {id}</ScreenTitle.Text>
        <ScreenTitle.TrainProgress>0/10</ScreenTitle.TrainProgress>
      </ScreenTitle.Root>
      <FlatList
        className="flex flex-1 pt-10"
        ListHeaderComponent={() => <TrainingInfo />}
        showsVerticalScrollIndicator={false}
        data={exercises}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Accordion.Root title={item.name}>
            <Accordion.Content>
              <View className="mb-4 flex flex-col">
                <Accordion.ContentTitle>DESCRIÇÃO: </Accordion.ContentTitle>
                <Accordion.ContentText>
                  {item.description}
                </Accordion.ContentText>
              </View>
              <View className="mb-4 flex flex-col">
                <Accordion.ContentTitle>OBSERVAÇÕES: </Accordion.ContentTitle>
                <Accordion.ContentText>
                  {item.observations}
                </Accordion.ContentText>
              </View>
              {item.series.map((serie, index) => (
                <View className="flex flex-col" key={index}>
                  <Accordion.ContentTitle>
                    SÉRIE {index + 1}:
                  </Accordion.ContentTitle>
                  <Checkbox.Root key={index}>
                    <View
                      className="flex flex-row items-center"
                      style={{ gap: 12 }}
                    >
                      <Checkbox.Toggle
                        checked={serie.isChecked}
                        onPress={() => {}}
                      />
                      <View
                        className="flex flex-1 flex-row"
                        style={{ gap: 12 }}
                      >
                        <Checkbox.Input
                          label="Repetições"
                          value={String(serie.repetitions.actual)}
                          lastTraining={`${serie.repetitions.lastTraining}x`}
                        />
                        <Checkbox.Input
                          label="Peso"
                          value={String(serie.weight.actual)}
                          lastTraining={`${serie.weight.lastTraining}kg`}
                        />
                      </View>
                    </View>
                  </Checkbox.Root>
                </View>
              ))}
            </Accordion.Content>
          </Accordion.Root>
        )}
        ListFooterComponent={() => (
          <View className="mb-12 pb-7 pt-5">
            <FitButton.Root variant="primary" onPress={() => {}}>
              <FitButton.Icon icon={Check} />
              <FitButton.Text>Finalizar Treino</FitButton.Text>
            </FitButton.Root>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
