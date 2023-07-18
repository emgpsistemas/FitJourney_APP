import { SignOut } from 'phosphor-react-native';
import { FitButton } from '../ui/FitButton';

export function LogoutButton() {
  return (
    <FitButton.Root variant="ghost" onPress={() => {}}>
      <FitButton.Icon icon={SignOut} />
      <FitButton.Text>Sair</FitButton.Text>
    </FitButton.Root>
  );
}
