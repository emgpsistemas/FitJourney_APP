import { SignOut } from 'phosphor-react-native';
import { FitButton } from '../ui/FitButton';

export function LogoutButton() {
  return (
    <FitButton.Root variant="ghost" onPress={() => {}}>
      <FitButton.Text>Sair</FitButton.Text>
      <FitButton.Icon icon={SignOut} />
    </FitButton.Root>
  );
}
