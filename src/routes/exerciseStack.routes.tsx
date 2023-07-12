import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterExercise } from "../screens/Common/RegisterExercise";
import RegisteredExercises from "../screens/Common/RegisteredExercises";

const Stack = createNativeStackNavigator();

export default function ExerciseStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RegisteredExercices"
        component={RegisteredExercises}
      />
      <Stack.Screen name="RegisterExercise" component={RegisterExercise} />
    </Stack.Navigator>
  );
}
