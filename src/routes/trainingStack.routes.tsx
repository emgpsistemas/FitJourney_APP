import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterNewTraining } from "../screens/User/RegisterNewTraining";

import RegisteredTrainings from "../screens/User/RegisteredTrainings";
import { TrainingDetails } from "../screens/User/TrainingDetails";

const Stack = createNativeStackNavigator();

export default function TrainingStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RegisteredTrainings"
        component={RegisteredTrainings}
      />
      <Stack.Screen name="TrainingDetails" component={TrainingDetails} />
      <Stack.Screen
        name="RegisterNewTraining"
        component={RegisterNewTraining}
      />
    </Stack.Navigator>
  );
}
