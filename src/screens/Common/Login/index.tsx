import { CaretRight } from 'phosphor-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FitButton } from '../../../components/ui/FitButton';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';

function Login() {
  const { signIn, signUpWithEmail } = useFirebaseAuth();
  return (
    <SafeAreaView className="flex flex-1 bg-yellow-400">
      <FitButton.Root
        variant="primary"
        onPress={() =>
          signIn({
            email: 'eduardomuchak@gmail.com',
            password: '#Teste2023',
          })
        }
      >
        <FitButton.Text>Entrar</FitButton.Text>
        <FitButton.Icon icon={CaretRight} />
      </FitButton.Root>

      <FitButton.Root
        variant="primary"
        onPress={() =>
          signUpWithEmail({
            email: 'eduardomuchak@gmail.com',
            password: '#Teste2023',
          })
        }
      >
        <FitButton.Text>Cadastrar</FitButton.Text>
        <FitButton.Icon icon={CaretRight} />
      </FitButton.Root>
    </SafeAreaView>
  );
}

export default Login;
