import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Common/Login';

const Stack = createStackNavigator();

export const AuthRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);
