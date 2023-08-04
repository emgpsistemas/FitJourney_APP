import { api } from "../../api";
import { Exercise } from "./interface";

async function getExercisesFromApi(): Promise<{
  data: Exercise[];
}> {
  const { data } = await api.get("exercises/");
  return { data };
}

export async function fetchExercises(setState: Function) {
  try {
    const response = await getExercisesFromApi();
    setState(response.data);
  } catch (error) {
    console.error(error);
  }
}
