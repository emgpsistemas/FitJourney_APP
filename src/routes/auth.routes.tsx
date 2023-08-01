import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from '../screens/Common/ForgotPassword';
import Login from '../screens/Common/Login';
import UserRegister from '../screens/Common/UserRegister';

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
