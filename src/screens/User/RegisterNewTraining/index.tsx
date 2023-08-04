import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Accordion } from "../../../components/Accordion";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { fetchExercises } from "../../../services/get/exercises/fetchAllExercises";
import { Exercise } from "../../../services/post/exercises/interface";
import { MultipleSelect } from "./testComponent";

export function RegisterNewTraining() {
  const [exercises, setExercises] = useState([] as Exercise.Exercise[]);
  const [
    selectedExercisesFromMultipleSelect,
    setSelectedExercisesFromMultipleSelect,
  ] = useState<string[]>([]);

  function handleSelectMultipleExercises(exercises: string[]) {
    setSelectedExercisesFromMultipleSelect(exercises);
  }

  useEffect(() => {
    fetchExercises(setExercises);
  }, []);

  const formattedExercises = exercises.map((exercise) => {
    return {
      label: exercise.name.toUpperCase(),
      value: exercise.name,
    };
  });

  const exercisesWithAllInformation =
    selectedExercisesFromMultipleSelect &&
    selectedExercisesFromMultipleSelect.map((exercise) => {
      return {
        id: exercises.find((ex) => ex.name === exercise)?.id,
        name: exercise,
        description: exercises.find((ex) => ex.name === exercise)?.description,
        muscle_group: exercises.find((ex) => ex.name === exercise)
          ?.muscle_group,
      };
    });

  return (
    <SafeAreaView className="flex flex-1 bg-white px-5 pt-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenTitle.Root>
          <ScreenTitle.GoBackButton />
          <ScreenTitle.Text>Cadastrar Treino</ScreenTitle.Text>
        </ScreenTitle.Root>
        <View className="pt-10">
          <MultipleSelect
            exercises={formattedExercises}
            onSelectExercises={handleSelectMultipleExercises}
          />
        </View>
        {selectedExercisesFromMultipleSelect &&
        selectedExercisesFromMultipleSelect.length > 0 ? (
          <View className="mt-4">
            {exercisesWithAllInformation.map((exercise) => (
              <View className="py-2">
                <Accordion.Root title={exercise.name} initialOpen>
                  <Accordion.Content>
                    <Accordion.ContentTitle>Descrição</Accordion.ContentTitle>
                    <Accordion.ContentText>
                      {exercise.description}
                    </Accordion.ContentText>
                  </Accordion.Content>
                </Accordion.Root>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
