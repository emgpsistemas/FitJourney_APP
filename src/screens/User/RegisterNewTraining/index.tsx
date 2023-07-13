import { View } from "react-native";
import { ScreenTitle } from "../../../components/ScreenTitle";

export function RegisterNewTraining() {
  return (
    <View className="flex flex-1 px-5 py-16">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <ScreenTitle.Text>Cadastrar Treino</ScreenTitle.Text>
      </ScreenTitle.Root>
    </View>
  );
}
