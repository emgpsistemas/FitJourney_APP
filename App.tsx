import 'expo-dev-client';
import * as SystemUI from 'expo-system-ui';

import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/open-sans';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import colors from 'tailwindcss/colors';
import { Loading } from './src/components/Loading';
import { ExercisesProvider } from './src/contexts/Exercises';
import { FirebaseAuthProvider } from './src/contexts/FirebaseAuth';
import { TrainingProvider } from './src/contexts/Trainings';
import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  async function SetBackgroundColor() {
    await SystemUI.setBackgroundColorAsync(colors.yellow[400]);
  }

  useEffect(() => {
    SetBackgroundColor();
  }, []);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <FirebaseAuthProvider>
        <ExercisesProvider>
          <TrainingProvider>
            <StatusBar style="dark" />
            <Routes />
          </TrainingProvider>
        </ExercisesProvider>
      </FirebaseAuthProvider>
    </NavigationContainer>
  );
}
