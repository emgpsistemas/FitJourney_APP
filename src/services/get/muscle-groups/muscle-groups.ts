import { api } from "../../api";
import { MuscleGroup } from "./interface";

async function getMuscleGroupsFromApi(): Promise<{
  data: MuscleGroup[];
}> {
  const { data } = await api.get("muscle-groups/");
  return { data };
}

export async function fetchMuscleGroups(fillState: Function) {
  try {
    const response = await getMuscleGroupsFromApi();
    fillState(response.data);
  } catch (error) {
    console.error(error);
  }
}
