import { useEffect } from 'react';
import { Loading } from '../components/Loading';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { AuthRoutes } from './auth.routes';
import TabRoutes from './tab.routes';

export default function Routes() {
  const { user, isLoading, checkUserSession } = useFirebaseAuth();

  useEffect(() => {
    checkUserSession();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return user ? <TabRoutes /> : <AuthRoutes />;
}
