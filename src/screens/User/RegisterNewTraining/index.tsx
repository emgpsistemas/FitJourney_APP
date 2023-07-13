import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { ErrorText } from "../../../components/ErrorText";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Input } from "../../../components/ui/Input";

export function RegisterNewTraining() {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  return (
    <View className="flex flex-1 bg-white px-5 py-16">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <ScreenTitle.Text>Cadastrar Treino</ScreenTitle.Text>
      </ScreenTitle.Root>
      <View className="pt-10">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <Input.Label label="Nome do Exercício" />
              <Input.Text
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </Input.Root>
          )}
          name="name"
        />
        {errors.name?.message ? (
          <ErrorText>{errors.name?.message}</ErrorText>
        ) : null}
      </View>
    </View>
  );
}
