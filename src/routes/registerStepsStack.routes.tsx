import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterUserInfoProvider } from '../contexts/RegisterUserInfo';
import StepFive from '../screens/User/RegisterSteps/StepFive';
import StepFour from '../screens/User/RegisterSteps/StepFour';
import StepOne from '../screens/User/RegisterSteps/StepOne';
import StepSix from '../screens/User/RegisterSteps/StepSix';
import StepThree from '../screens/User/RegisterSteps/StepThree';
import StepTwo from '../screens/User/RegisterSteps/StepTwo';

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
        <Stack.Screen name="Step1" component={StepOne} />
        <Stack.Screen name="Step2" component={StepTwo} />
        <Stack.Screen name="Step3" component={StepThree} />
        <Stack.Screen name="Step4" component={StepFour} />
        <Stack.Screen name="Step5" component={StepFive} />
        <Stack.Screen name="Step6" component={StepSix} />
      </Stack.Navigator>
    </RegisterUserInfoProvider>
  );
}
