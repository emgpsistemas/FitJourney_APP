import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Exercises from '../screens/User/Exercises';

const Stack = createNativeStackNavigator();

export default function ExerciseStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Exercices" component={Exercises} />
    </Stack.Navigator>
  );
}
