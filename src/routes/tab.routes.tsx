import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from 'tailwindcss/colors';

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
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? colors.yellow[400] : colors.zinc[700]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={Exercises}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="list"
              size={size}
              color={focused ? colors.yellow[400] : colors.zinc[700]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Trainings"
        component={Trainings}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="barbell"
              size={size}
              color={focused ? colors.yellow[400] : colors.zinc[700]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="person-circle"
              size={size}
              color={focused ? colors.yellow[400] : colors.zinc[700]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
