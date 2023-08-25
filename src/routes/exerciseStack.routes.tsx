import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterExercise } from '../screens/Private/RegisterExercise';
import RegisteredExercises from '../screens/Private/RegisteredExercises';

const Stack = createNativeStackNavigator();

export default function ExerciseStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RegisteredExercises"
        component={RegisteredExercises}
      />
      <Stack.Screen name="RegisterExercise" component={RegisterExercise} />
    </Stack.Navigator>
  );
}
