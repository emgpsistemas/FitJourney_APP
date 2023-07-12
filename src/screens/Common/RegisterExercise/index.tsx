import { Check } from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from "react-native";
import { FitButton } from "../../../components/ui/FitButton";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { TextArea } from "../../../components/ui/Textarea/index";
import { MuscleGroup } from "../../../services/get/muscle-groups/interface";
import { fetchMuscleGroups } from "../../../services/get/muscle-groups/muscle-groups";
import { createExercise } from "../../../services/post/exercises/createExercise";

export function RegisterExercise() {
  const [muscleGroups, setMuscleGroups] = useState([] as MuscleGroup[]);
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setName(event.nativeEvent.text);
  }

  function handleChangeDescription(
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setDescription(event.nativeEvent.text);
  }

  useEffect(() => {
    fetchMuscleGroups(setMuscleGroups);
  }, []);

  const muscleGroupsNames = muscleGroups.map((muscleGroup) => muscleGroup.name);

  const muscleGroupsOptions = [
    "Selecione o Grupo Muscular",
    ...muscleGroupsNames,
  ];

  function clearFormFields() {
    setName("");
    setMuscleGroup("");
    setDescription("");
  }

  async function handleRegisterExercise() {
    const muscleGroupId =
      muscleGroups.find((group) => group.name === muscleGroup)?.id || 0;

    const newExercise = {
      name,
      muscle_group: muscleGroupId,
      description,
    };

    try {
      await createExercise(newExercise);
      console.log("Exercise created successfully");
    } catch (error) {
      console.error("Error creating exercise:", error);
    }

    clearFormFields();
  }

  return (
    <View className="flex flex-1 justify-between bg-white p-6">
      <View className="flex flex-1 justify-center space-y-4">
        <View>
          <Input label="Nome" value={name} onChange={handleChangeName} />
        </View>
        <View>
          <Select
            label="Grupo Muscular"
            options={muscleGroupsOptions}
            selected={muscleGroup}
            setSelected={setMuscleGroup}
          />
        </View>
        <View>
          <TextArea
            label="Descrição"
            value={description}
            onChange={handleChangeDescription}
          />
        </View>
      </View>

      <View>
        <FitButton.Root variant="primary" onPress={handleRegisterExercise}>
          <FitButton.Icon icon={Check} />
          <FitButton.Text>Finalizar Cadastro</FitButton.Text>
        </FitButton.Root>
      </View>
    </View>
  );
}
