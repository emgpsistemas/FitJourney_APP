import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterUserInfoProvider } from '../contexts/RegisterUserInfo';
import StepAge from '../screens/User/RegisterSteps/StepAge';
import StepFitnessLevel from '../screens/User/RegisterSteps/StepFitnessLevel';
import StepGender from '../screens/User/RegisterSteps/StepGender';
import StepGoal from '../screens/User/RegisterSteps/StepGoal';
import StepHeight from '../screens/User/RegisterSteps/StepHeight';
import StepName from '../screens/User/RegisterSteps/StepName';
import StepWeight from '../screens/User/RegisterSteps/StepWeight';

const Stack = createNativeStackNavigator();

export default function RegisterStepsStackRoutes() {
  return (
    <RegisterUserInfoProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Step1"
      >
        <Stack.Screen name="Step1" component={StepName} />
        <Stack.Screen name="Step2" component={StepGender} />
        <Stack.Screen name="Step3" component={StepAge} />
        <Stack.Screen name="Step4" component={StepWeight} />
        <Stack.Screen name="Step5" component={StepHeight} />
        <Stack.Screen name="Step6" component={StepGoal} />
        <Stack.Screen name="Step7" component={StepFitnessLevel} />
      </Stack.Navigator>
    </RegisterUserInfoProvider>
  );
}
