import { SignOut } from 'phosphor-react-native';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { FitButton } from '../ui/FitButton';

export function LogoutButton() {
  const { signOut } = useFirebaseAuth();
  return (
    <FitButton.Root variant="ghost" onPress={signOut}>
      <FitButton.Icon icon={SignOut} />
      <FitButton.Text>Sair</FitButton.Text>
    </FitButton.Root>
  );
}
