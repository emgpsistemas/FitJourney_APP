import { useEffect } from 'react';
import { Loading } from '../components/Loading';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import RegisterStepsStackRoutes from './registerStepsStack.routes';

export default function Routes() {
  const { user, isLoading, checkUserSession } = useFirebaseAuth();

  useEffect(() => {
    checkUserSession();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  // return user ? <TabRoutes /> : <AuthRoutes />;
  return <RegisterStepsStackRoutes />;
}
