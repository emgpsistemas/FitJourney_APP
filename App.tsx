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
import { useEffect } from 'react';
import { Loading } from './src/components/Loading';
import { FirebaseAuthProvider } from './src/contexts/FirebaseAuth';
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
    await SystemUI.setBackgroundColorAsync('#FAFAFA');
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
        <Routes />
      </FirebaseAuthProvider>
    </NavigationContainer>
  );
}
