import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from 'tailwindcss/colors';

import { Barbell, House, ListPlus, UserCircle } from 'phosphor-react-native';
import Exercises from '../screens/Customer/Exercises';
import Home from '../screens/Customer/Home';
import Profile from '../screens/Customer/Profile';
import Trainings from '../screens/Customer/Trainings';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.zinc[900],
          borderTopColor: colors.yellow[400],
          borderTopWidth: 4,
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <House
              size={focused ? 28 : 24}
              color={focused ? colors.yellow[400] : colors.zinc[700]}
              weight={focused ? 'fill' : 'bold'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={Exercises}
        options={{
          tabBarIcon: ({ focused }) => (
            <ListPlus
              size={focused ? 28 : 24}
              color={focused ? colors.yellow[400] : colors.zinc[700]}
              weight={focused ? 'fill' : 'bold'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Trainings"
        component={Trainings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Barbell
              size={focused ? 28 : 24}
              color={focused ? colors.yellow[400] : colors.zinc[700]}
              weight={focused ? 'fill' : 'bold'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <UserCircle
              size={focused ? 28 : 24}
              color={focused ? colors.yellow[400] : colors.zinc[700]}
              weight={focused ? 'fill' : 'bold'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
