import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StepOne from '../screens/User/RegisterSteps/StepOne';

const Stack = createNativeStackNavigator();

export default function RegisterStepsStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StepOne" component={StepOne} />
    </Stack.Navigator>
  );
}
