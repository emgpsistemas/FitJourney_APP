import { useRoute } from '@react-navigation/native';
import clsx from 'clsx';
import { Check } from 'phosphor-react-native';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Accordion } from '../../../components/Accordion';
import AccordionContentText from '../../../components/Accordion/AccordionContentText';
import AccordionContentTitle from '../../../components/Accordion/AccordionContentTitle';
import { Checkbox } from '../../../components/Checkbox';
import { FitButton } from '../../../components/FitButton';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { TrainingInfo } from '../../../components/TrainingInfo';

export function TrainingDetails() {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const training = {
    name: 'Treino A',
  };

  const exercises = [
    {
      id: 1,
      name: 'Supino Reto',
      description:
        'Deite-se em um banco reto, segure a barra com as mãos na largura dos ombros e afaste os cotovelos até que estejam alinhados com os ombros. Desça a barra até o peito e volte à posição inicial.',
      observations:
        'Mantenha os pés apoiados no chão e o quadril encostado no banco durante todo o exercício.',
      series: [
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: true,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
      ],
    },
    {
      id: 2,
      name: 'Supino Reto',
      description:
        'Deite-se em um banco reto, segure a barra com as mãos na largura dos ombros e afaste os cotovelos até que estejam alinhados com os ombros. Desça a barra até o peito e volte à posição inicial.',
      observations:
        'Mantenha os pés apoiados no chão e o quadril encostado no banco durante todo o exercício.',
      series: [
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
      ],
    },
    {
      id: 3,
      name: 'Supino Reto',
      description:
        'Deite-se em um banco reto, segure a barra com as mãos na largura dos ombros e afaste os cotovelos até que estejam alinhados com os ombros. Desça a barra até o peito e volte à posição inicial.',
      observations:
        'Mantenha os pés apoiados no chão e o quadril encostado no banco durante todo o exercício.',
      series: [
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
      ],
    },
    {
      id: 4,
      name: 'Supino Reto',
      description:
        'Deite-se em um banco reto, segure a barra com as mãos na largura dos ombros e afaste os cotovelos até que estejam alinhados com os ombros. Desça a barra até o peito e volte à posição inicial.',
      observations:
        'Mantenha os pés apoiados no chão e o quadril encostado no banco durante todo o exercício.',
      series: [
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
      ],
    },
    {
      id: 5,
      name: 'Supino Reto',
      description:
        'Deite-se em um banco reto, segure a barra com as mãos na largura dos ombros e afaste os cotovelos até que estejam alinhados com os ombros. Desça a barra até o peito e volte à posição inicial.',
      observations:
        'Mantenha os pés apoiados no chão e o quadril encostado no banco durante todo o exercício.',
      series: [
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
        {
          isChecked: false,
          repetitions: 10,
          weight: 20,
        },
      ],
    },
  ];

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
                <AccordionContentTitle>Descrição: </AccordionContentTitle>
                <AccordionContentText>{item.description}</AccordionContentText>
              </View>
              <View className="mb-4 flex flex-col">
                <AccordionContentTitle>Observações: </AccordionContentTitle>
                <AccordionContentText>{item.observations}</AccordionContentText>
              </View>
              {item.series.map((serie, index) => (
                <Checkbox.Root key={index}>
                  <Checkbox.Toggle
                    checked={serie.isChecked}
                    onPress={() => {}}
                  />
                </Checkbox.Root>
              ))}
            </Accordion.Content>
          </Accordion.Root>
        )}
        ListFooterComponent={() => (
          <View className="mb-12 pb-7 pt-5">
            <FitButton.Root variant="primary" onPress={() => {}}>
              <FitButton.Icon icon={Check} />
              <FitButton.Text content="Finalizar Treino" />
            </FitButton.Root>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
