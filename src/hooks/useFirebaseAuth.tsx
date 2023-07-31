import { useContext } from 'react';
import { FirebaseAuthContext } from '../contexts/FirebaseAuth';

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
