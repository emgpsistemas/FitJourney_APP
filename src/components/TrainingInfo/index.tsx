import { Text, View } from 'react-native';

interface TrainingInfoProps {
  trainingDates: {
    startDate: string;
    lastTrainingDate: string | null;
  };
}

export function TrainingInfo({ trainingDates }: TrainingInfoProps) {
  return (
    <View className="mb-7 flex flex-col space-y-1">
      <View className="flex flex-row space-x-1">
        <Text className="font-openBold text-xs text-zinc-900">
          Data de Início:
        </Text>
        <Text className="font-openSemibold text-xs text-zinc-900">
          {new Date(trainingDates.startDate).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </Text>
      </View>
      <View className="flex flex-row space-x-1">
        <Text className="font-openBold text-xs text-zinc-900">
          Data do Último Treino:
        </Text>
        {trainingDates.lastTrainingDate ? (
          <Text className="font-openSemibold text-xs text-zinc-900">
            {new Date(trainingDates.lastTrainingDate).toLocaleDateString(
              'pt-BR',
              {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              },
            )}
          </Text>
        ) : (
          <Text className="font-openSemibold text-xs text-zinc-900">
            Nenhum treino realizado ainda
          </Text>
        )}
      </View>
    </View>
  );
}
