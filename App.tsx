import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { Text, View } from 'react-native';

import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/open-sans';
import { useEffect } from 'react';
import { Loading } from './src/Loading';

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
    <View className="flex h-screen w-screen items-center justify-center bg-yellow-400">
      <StatusBar style="auto" />
      <Text className="font-openBold text-xl text-zinc-900">Hello World</Text>
    </View>
  );
}
