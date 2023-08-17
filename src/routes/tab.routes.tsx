import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from 'tailwindcss/colors';

import { Barbell, House, ListPlus, UserCircle } from 'phosphor-react-native';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import ExerciseStackRoutes from './exerciseStack.routes';
import HomeStackRoutes from './homeStack.routes';
import ProfileStackRoutes from './profileStack.routes';
import RegisterStepsStackRoutes from './registerStepsStack.routes';
import TrainingStackRoutes from './trainingStack.routes';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { fitJourneyUser } = useFirebaseAuth();

  if (fitJourneyUser.isBasicInfoCompleted) {
    return <RegisterStepsStackRoutes />;
  }

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
        name="HomeStack"
        component={HomeStackRoutes}
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
        name="ExercisesStack"
        component={ExerciseStackRoutes}
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
        name="TrainingsStack"
        component={TrainingStackRoutes}
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
        name="ProfileStack"
        component={ProfileStackRoutes}
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
