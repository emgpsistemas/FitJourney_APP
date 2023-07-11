import { Text, View } from 'react-native';

export function TrainingInfo() {
  return (
    <View className="mb-7 flex flex-col space-y-1">
      <View className="flex flex-row space-x-1">
        <Text className="font-openBold text-xs text-zinc-900">
          Data de Início:
        </Text>
        <Text className="font-openSemibold text-xs text-zinc-900">
          01/07/2023
        </Text>
      </View>
      {/* <View className="flex flex-row space-x-1">
        <Text className="font-openBold text-xs text-zinc-900">
          Quantidade de Repetições do Treino:
        </Text>
        <Text className="font-openSemibold text-xs text-zinc-900">10x</Text>
      </View> */}
      <View className="flex flex-row space-x-1">
        <Text className="font-openBold text-xs text-zinc-900">
          Data do Último Treino:
        </Text>
        <Text className="font-openSemibold text-xs text-zinc-900">
          01/07/2023
        </Text>
      </View>
    </View>
  );
}
