import { api } from "../../api";
import { MuscleGroup } from "./interface";

async function getMuscleGroupsFromApi(): Promise<{
  data: MuscleGroup[];
}> {
  const { data } = await api.get("muscle-groups/");
  return { data };
}

export async function fetchMuscleGroups(setState: Function) {
  try {
    const response = await getMuscleGroupsFromApi();
    setState(response.data);
  } catch (error) {
    console.error(error);
  }
}
