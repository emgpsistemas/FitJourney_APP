import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterNewTraining } from '../screens/Private/RegisterNewTraining';

import RegisteredTrainings from '../screens/Private/RegisteredTrainings';
import { TrainingDetails } from '../screens/Private/TrainingDetails';

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
