import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterUserInfoProvider } from '../contexts/RegisterUserInfo';
import StepAge from '../screens/Private/RegisterSteps/StepAge';
import StepFitnessLevel from '../screens/Private/RegisterSteps/StepFitnessLevel';
import StepGender from '../screens/Private/RegisterSteps/StepGender';
import StepGoal from '../screens/Private/RegisterSteps/StepGoal';
import StepHeight from '../screens/Private/RegisterSteps/StepHeight';
import StepName from '../screens/Private/RegisterSteps/StepName';
import StepWeight from '../screens/Private/RegisterSteps/StepWeight';

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
