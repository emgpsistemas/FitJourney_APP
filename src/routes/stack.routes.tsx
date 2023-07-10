import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RegisterExercise } from "../screens/Common/RegisterExercise";
import TabRoutes from "./tab.routes";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={TabRoutes} />
      <Stack.Screen name="RegisterExercise" component={RegisterExercise} />
    </Stack.Navigator>
  );
}
