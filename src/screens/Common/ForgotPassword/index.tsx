import { zodResolver } from '@hookform/resolvers/zod';
import { CaretLeft, CaretRight } from 'phosphor-react-native';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSVG from '../../../assets/brand/Logo.svg';

import { useNavigation } from '@react-navigation/native';
import { ErrorText } from '../../../components/ErrorText';
import { FitButton } from '../../../components/ui/FitButton';
import { Input } from '../../../components/ui/Input';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';
import {
  PasswordRecoveryFormData,
  passwordRecoverySchema,
} from '../../../validations/common/PasswordRecovery';

function ForgotPassword() {
  const { recoveryPassword } = useFirebaseAuth();
  const { goBack } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(passwordRecoverySchema),
  });

  const onSubmit = (data: PasswordRecoveryFormData) => {
    recoveryPassword(data.email);
  };

  return (
    <SafeAreaView className="relative flex flex-1 flex-col bg-yellow-400">
      <View className="flex-1 px-6">
        <View className="flex-1 items-center justify-center">
          <LogoSVG width={'70%'} />
        </View>
      </View>

      <View className="h-fit flex-col items-center justify-between rounded-t-xl bg-neutral-50 px-6 pb-8 pt-10">
        <Text className="mb-7 text-center font-openBold text-base text-zinc-900">
          Recuperação de Senha
        </Text>
        <View className="w-full">
          <View className="flex flex-col pb-3">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  label="Email"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name={'email'}
            />
            {errors.email?.message ? (
              <ErrorText>{errors.email?.message}</ErrorText>
            ) : null}
          </View>
        </View>
        <View className="mt-6 flex w-full flex-row items-center justify-between">
          <View className="w-32">
            <FitButton.Root variant="outline" onPress={() => goBack()}>
              <FitButton.Icon icon={CaretLeft} />
              <FitButton.Text>Voltar</FitButton.Text>
            </FitButton.Root>
          </View>
          <View className="w-40">
            <FitButton.Root variant="primary" onPress={handleSubmit(onSubmit)}>
              <FitButton.Text>Recuperar</FitButton.Text>
              <FitButton.Icon icon={CaretRight} />
            </FitButton.Root>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ForgotPassword;
