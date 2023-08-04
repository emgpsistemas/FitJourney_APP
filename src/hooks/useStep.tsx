import { useContext } from 'react';
import { RegisterUserInfoContext } from '../contexts/RegisterUserInfo';

export function useStep() {
  const context = useContext(RegisterUserInfoContext);

  if (!context) {
    throw new Error('useStep must be used within an RegisterUserInfoProvider.');
  }

  return context;
}
