import { zodResolver } from '@hookform/resolvers/zod';
import { CaretRight, Eye, EyeSlash } from 'phosphor-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSVG from '../../../assets/brand/Logo.svg';
import GoogleSVG from '../../../assets/google-logo.svg';

import { useNavigation } from '@react-navigation/native';
import { ErrorText } from '../../../components/ErrorText';
import { FitButton } from '../../../components/ui/FitButton';
import { Input } from '../../../components/ui/Input';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';
import {
  UserRegisterFormData,
  userRegisterSchema,
} from '../../../validations/common/UserRegister';

function UserRegister() {
  const { signUpWithEmail, signInWithGoogle } = useFirebaseAuth();
  const { navigate } = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(userRegisterSchema),
  });

  const togglePasswordVisibility = (event: GestureResponderEvent) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = (event: GestureResponderEvent) => {
    event.preventDefault();
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const onSubmit = (data: UserRegisterFormData) => {
    signUpWithEmail(data);
  };

  return (
    <SafeAreaView className="relative flex flex-1 flex-col bg-yellow-400">
      <View className="flex-1 px-6">
        <View className="flex flex-row pt-6">
          <TouchableOpacity
            className="mr-6 flex w-10 flex-col"
            activeOpacity={0.7}
            onPress={() => navigate('Login')}
          >
            <Text className="mb-1 font-openSemibold text-sm text-zinc-900">
              Login
            </Text>
          </TouchableOpacity>
          <View className="flex flex-col">
            <Text className="mb-1 font-openSemibold text-sm text-zinc-900">
              Cadastre-se
            </Text>
            <View className="h-1 w-fit bg-zinc-900" />
          </View>
        </View>
        <View className="flex-1 items-center justify-center">
          <LogoSVG width={'70%'} />
        </View>
      </View>

      <View className="h-fit flex-col items-center justify-between rounded-t-xl bg-neutral-50 px-6 pb-8 pt-10">
        <Text className="mb-7 text-center font-openBold text-base text-zinc-900">
          Cadastre-se
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
          <View className="flex flex-col pb-3">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    label="SENHA"
                    placeholder="Senha"
                    secureTextEntry={isPasswordVisible ? false : true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    maxLength={20}
                  />
                  <TouchableOpacity
                    className="absolute right-3 top-8"
                    onPress={(event) => togglePasswordVisibility(event)}
                    activeOpacity={0.7}
                  >
                    {isPasswordVisible ? (
                      <EyeSlash size={24} color="#000000" weight="bold" />
                    ) : (
                      <Eye size={24} color="#000000" weight="bold" />
                    )}
                  </TouchableOpacity>
                  {errors.password?.message ? (
                    <ErrorText>{errors.password?.message}</ErrorText>
                  ) : null}
                </>
              )}
              name="password"
            />
          </View>
          <View className="flex flex-col pb-6">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    label="CONFIRME A SENHA"
                    placeholder="Confirme a Senha"
                    secureTextEntry={isConfirmPasswordVisible ? false : true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    maxLength={20}
                  />
                  <TouchableOpacity
                    className="absolute right-3 top-8"
                    onPress={(event) => toggleConfirmPasswordVisibility(event)}
                    activeOpacity={0.7}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeSlash size={24} color="#000000" weight="bold" />
                    ) : (
                      <Eye size={24} color="#000000" weight="bold" />
                    )}
                  </TouchableOpacity>
                  {errors.confirmPassword?.message ? (
                    <ErrorText>{errors.confirmPassword?.message}</ErrorText>
                  ) : null}
                </>
              )}
              name="confirmPassword"
            />
          </View>
        </View>
        <View className="flex w-full flex-row items-center justify-between">
          <TouchableOpacity
            className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800"
            activeOpacity={0.7}
            onPress={signInWithGoogle}
          >
            <GoogleSVG width={24} height={24} />
          </TouchableOpacity>
          <View className="w-40">
            <FitButton.Root variant="primary" onPress={handleSubmit(onSubmit)}>
              <FitButton.Text>Cadastrar</FitButton.Text>
              <FitButton.Icon icon={CaretRight} />
            </FitButton.Root>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default UserRegister;
