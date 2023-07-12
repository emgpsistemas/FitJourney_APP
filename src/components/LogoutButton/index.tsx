import { SignOut } from "phosphor-react-native";
import { FitButton } from "../ui/FitButton";

export function LogoutButton() {
  return (
    <FitButton.Root variant="ghost" onPress={() => {}}>
      <FitButton.Text content="Sair" />
      <FitButton.Icon icon={SignOut} />
    </FitButton.Root>
  );
}
