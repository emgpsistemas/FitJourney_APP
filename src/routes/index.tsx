import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { AuthRoutes } from './auth.routes';
import TabRoutes from './tab.routes';

export default function Routes() {
  const { session, isLoading, checkUserSession } = useFirebaseAuth();

  useEffect(() => {
    checkUserSession();
  }, []);

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator color={colors.yellow[500]} size={80} />
      </View>
    );
  }

  return session ? <TabRoutes /> : <AuthRoutes />;
}
