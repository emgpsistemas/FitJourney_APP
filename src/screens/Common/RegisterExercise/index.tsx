import { View } from "react-native";
import { FitButton } from "../../../components/ui/FitButton";
import { TextArea } from "../../../components/ui/Textarea/index";

export function RegisterExercise() {
  return (
    <View className="flex flex-1 items-center justify-center p-6">
      <TextArea label="Descrição" />
      <FitButton.Root variant="primary">
        <FitButton.Text>Finalizar Cadastro</FitButton.Text>
      </FitButton.Root>
    </View>
  );
}
