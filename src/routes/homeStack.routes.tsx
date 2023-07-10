import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/User/Home';

const Stack = createNativeStackNavigator();

export default function HomeStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
