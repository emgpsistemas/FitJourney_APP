import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { ErrorText } from "../../../components/ErrorText";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { FitButton } from "../../../components/ui/FitButton";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { TextArea } from "../../../components/ui/Textarea/index";
import { MuscleGroup } from "../../../services/get/muscle-groups/interface";
import { fetchMuscleGroups } from "../../../services/get/muscle-groups/muscle-groups";
import { createExercise } from "../../../services/post/exercises/createExercise";
import {
  NewExerciseFormData,
  newExerciseFormSchema,
} from "../../../validations/common/CreateExercise";

export function RegisterExercise() {
  const [muscleGroups, setMuscleGroups] = useState([] as MuscleGroup[]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<NewExerciseFormData>({
    defaultValues: {
      name: "",
      muscleGroup: "",
      description: "",
    },
    resolver: zodResolver(newExerciseFormSchema),
  });

  useEffect(() => {
    fetchMuscleGroups(setMuscleGroups);
  }, []);

  const muscleGroupsNames = muscleGroups.map((muscleGroup) => muscleGroup.name);

  const muscleGroupsOptions = [
    "Selecione o Grupo Muscular",
    ...muscleGroupsNames,
  ];

  async function handleRegisterExercise(data: NewExerciseFormData) {
    const muscleGroupId =
      muscleGroups.find((group) => group.name === data.muscleGroup)?.id || 0;

    const newExercise = {
      name: data.name,
      muscle_group: muscleGroupId,
      description: data.description,
    };

    try {
      await createExercise(newExercise);
      console.log("Exercise created successfully");
    } catch (error) {
      console.error("Error creating exercise:", error);
    }

    reset();
  }

  return (
    <View className="flex flex-1 justify-between border border-red-600 bg-white px-5 pb-7 pt-16">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <ScreenTitle.Text>Cadastrar Exercício</ScreenTitle.Text>
      </ScreenTitle.Root>

      <View className="mt-10 flex flex-1 justify-start space-y-4">
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Nome"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="name"
          />
          {errors.name?.message ? (
            <ErrorText>{errors.name?.message}</ErrorText>
          ) : null}
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Grupo Muscular"
                options={muscleGroupsOptions}
                selected={value}
                setSelected={onChange}
              />
            )}
            name="muscleGroup"
          />
          {errors.muscleGroup?.message ||
          getValues().description === "Selecione o Grupo Muscular" ? (
            <ErrorText>Um grupo muscular deve ser selecionado</ErrorText>
          ) : null}
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextArea
                label="Descrição"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="description"
          />
          {errors.description?.message ? (
            <ErrorText>{errors.description?.message}</ErrorText>
          ) : null}
        </View>
      </View>

      <View>
        <FitButton.Root
          variant="primary"
          onPress={handleSubmit(handleRegisterExercise)}
        >
          <FitButton.Icon icon={Check} />
          <FitButton.Text>Finalizar Cadastro</FitButton.Text>
        </FitButton.Root>
      </View>
    </View>
  );
}
