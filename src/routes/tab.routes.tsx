import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from 'tailwindcss/colors';

import { Barbell, House, ListPlus, UserCircle } from 'phosphor-react-native';
import Exercises from '../screens/Exercises';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Trainings from '../screens/Trainings';

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
              size={28}
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
              size={28}
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
              size={28}
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
              size={28}
              color={focused ? colors.yellow[400] : colors.zinc[700]}
              weight={focused ? 'fill' : 'bold'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
