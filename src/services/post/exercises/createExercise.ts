import { api } from "../../api";
import { Exercise } from "./interface";

export async function createExercise(exercise: Exercise.Create) {
  try {
    const response = await api.post("exercises/create/", exercise);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create exercise: ${error}`);
  }
}
