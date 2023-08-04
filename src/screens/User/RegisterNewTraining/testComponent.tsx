import { CaretDown, CaretUp } from "phosphor-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "tailwindcss/colors";
import { selectedExercises } from "./selectedExercises.interface";

interface MultipleSelectProps {
  exercises: selectedExercises[];
  onSelectExercises: (exercises: string[]) => void;
}

export function MultipleSelect({
  exercises,
  onSelectExercises,
}: MultipleSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);


  onSelectExercises(value!);

  return (
    <DropDownPicker
      placeholder="Selecione um exercício"
      listMode="MODAL"
      searchPlaceholder="Digite para pesquisar"
      multiple={true}
      open={open}
      value={value}
      items={exercises}
      setOpen={setOpen}
      setValue={setValue}
      // setItems={setFormattedExercises}
      searchable={true}
      searchTextInputStyle={{
        backgroundColor: "#F8F9FA",
        borderRadius: 8,
        borderWidth: 0,
        height: 56,
        paddingHorizontal: 20,
        paddingVertical: 8,
        margin: 0,
      }}
      style={{
        zIndex: 50,
        backgroundColor: "#F8F9FA",
        height: 56,
        borderRadius: 8,
        borderWidth: 0,
        paddingHorizontal: 20,
        paddingVertical: 8,
      }}
      ArrowDownIconComponent={() => {
        return <CaretDown size={13} color={colors.gray[500]} weight="fill" />;
      }}
      ArrowUpIconComponent={() => {
        return <CaretUp size={13} color={colors.gray[500]} weight="fill" />;
      }}
      ListEmptyComponent={() => {
        return (
          <View className="my-10 flex flex-row items-center justify-center">
            <Text className="font-poppinsSemibold text-base text-neutral-900">
              Nenhum item encontrado
            </Text>
          </View>
        );
      }}
    />
  );
}
