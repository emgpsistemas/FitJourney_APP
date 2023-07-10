import { Check } from "phosphor-react-native";
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
    <View className="flex flex-1 justify-between bg-white p-6">
      <View className="flex flex-1 justify-center space-y-4">
        <View>
          <Input label="Nome" />
        </View>
        <View>
          <Select
            label="Grupo Muscular"
            options={muscleGroups}
            selected=""
            setSelected={() => console.log("selecionou")}
          />
        </View>
        <View>
          <TextArea label="Descrição" />
        </View>
      </View>

      <View>
        <FitButton.Root variant="primary">
          <FitButton.Icon icon={Check} />
          <FitButton.Text>Finalizar Cadastro</FitButton.Text>
        </FitButton.Root>
      </View>
    </View>
  );
}
