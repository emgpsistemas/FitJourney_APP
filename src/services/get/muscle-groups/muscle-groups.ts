import { api } from "../../api";
import { MuscleGroup } from "./interfaces";

export async function fetchMuscleGroups(): Promise<{
  data: MuscleGroup[];
}> {
  const { data } = await api.get("muscle-groups/");
  return { data };
}
