import { View } from "react-native";
import { FitButton } from "../../../components/ui/FitButton";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { TextArea } from "../../../components/ui/Textarea/index";

const muscleGroups = [
  "Peitoral",
  "Costas",
  "Ombro",
  "Bíceps",
  "Tríceps",
  "Abdômen",
  "Perna",
  "Glúteo",
  "Panturrilha",
];

export function RegisterExercise() {
  return (
    <View className="flex flex-1 justify-center bg-gray-400 p-6">
      <View>
        <Input label="Nome" />
        <Select
          label="Grupo Muscular"
          options={muscleGroups}
          selected="Peitoral"
          setSelected={() => console.log("selecionou")}
        />
        <TextArea label="Descrição" />
      </View>
      <FitButton.Root variant="primary">
        <FitButton.Text>Finalizar Cadastro</FitButton.Text>
      </FitButton.Root>
    </View>
  );
}
