import { ActivityIndicator, View } from 'react-native';
import colors from 'tailwindcss/colors';

export function Loading() {
  return (
    <View className="flex h-screen flex-1 flex-col items-center justify-center gap-2">
      <ActivityIndicator color={colors.zinc[800]} size={64} />
    </View>
  );
}
