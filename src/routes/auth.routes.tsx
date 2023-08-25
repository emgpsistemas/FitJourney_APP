import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from '../screens/Public/ForgotPassword';
import Login from '../screens/Public/Login';
import UserRegister from '../screens/Public/UserRegister';

const Stack = createStackNavigator();

export const AuthRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="UserRegister" component={UserRegister} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);
