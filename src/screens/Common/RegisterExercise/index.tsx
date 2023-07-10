import { Check } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { FitButton } from "../../../components/ui/FitButton";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { TextArea } from "../../../components/ui/Textarea/index";
import { MuscleGroup } from "../../../services/get/muscle-groups/interfaces";
import { fetchMuscleGroups } from "../../../services/get/muscle-groups/muscle-groups";

export function RegisterExercise() {
  const [muscleGroups, setMuscleGroups] = useState([] as MuscleGroup[]);

  useEffect(() => {
    async function getMuscleGroups() {
      try {
        const response = await fetchMuscleGroups();
        setMuscleGroups(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getMuscleGroups();
  }, []);

  const muscleGroupsOptions = muscleGroups.map(
    (muscleGroup) => muscleGroup.name
  );

  return (
    <View className="flex flex-1 justify-between bg-white p-6">
      <View className="flex flex-1 justify-center space-y-4">
        <View>
          <Input label="Nome" />
        </View>
        <View>
          <Select
            label="Grupo Muscular"
            options={muscleGroupsOptions}
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
