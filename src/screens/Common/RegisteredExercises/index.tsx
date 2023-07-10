import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { FitButton } from "../../../components/ui/FitButton";

export default function RegisteredExercises() {
  const navigation = useNavigation();

  function handleRegisterExercise() {
    navigation.navigate("RegisterExercise");
  }

  return (
    <View className="flex h-screen w-screen items-center justify-center ">
      <Text className="font-openBold text-xl text-zinc-900">Exercises</Text>
      <FitButton.Root variant="primary" onPress={handleRegisterExercise}>
        <FitButton.Text>Cadastrar Exercício</FitButton.Text>
      </FitButton.Root>
    </View>
  );
}
 