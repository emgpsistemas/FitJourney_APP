import { SignOut } from 'phosphor-react-native';
import { FitButton } from '../FitButton';

export function LogoutButton() {
  return (
    <FitButton.Root variant="ghost" onPress={() => {}}>
      <FitButton.Text content="Sair" />
      <FitButton.Icon icon={SignOut} />
    </FitButton.Root>
  );
}
