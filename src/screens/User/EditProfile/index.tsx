import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'phosphor-react-native';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorText } from '../../../components/ErrorText';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { FitButton } from '../../../components/ui/FitButton';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { TextArea } from '../../../components/ui/Textarea';
import {
  EditProfileFormData,
  editProfileSchema,
} from '../../../validations/User/EditProfile';

function EditProfile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProfileFormData>({
    defaultValues: {
      name: '',
      email: '',
      age: '',
      weight: '',
      height: '',
      gender: '',
      objective: '',
      activityLevel: '',
      observations: '',
    },
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit = (data: EditProfileFormData) => {
    try {
      console.log('PAYLOAD =>', data);
    } catch (error: any) {
      console.log('ERROR =>', error);
    } finally {
      reset();
    }
  };

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-5">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <ScreenTitle.Text>Editar Perfil</ScreenTitle.Text>
      </ScreenTitle.Root>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex flex-1 pt-10"
      >
        <View className="flex flex-col pb-3">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                label="Nome"
                onChangeText={onChange}
                value={value}
              />
            )}
            name={'name'}
          />
          {errors.name?.message ? (
            <ErrorText>{errors.name?.message}</ErrorText>
          ) : null}
        </View>
        <View className="mb-3 flex flex-col">
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
        <View className="mb-3 flex flex-col">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                label="Idade"
                onChangeText={onChange}
                value={value}
              />
            )}
            name={'age'}
          />
          {errors.age?.message ? (
            <ErrorText>{errors.age?.message}</ErrorText>
          ) : null}
        </View>
        <View className="mb-3 flex w-full flex-row space-x-3">
          <View className="flex flex-1 flex-col">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  label="Peso"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name={'weight'}
            />
            {errors.weight?.message ? (
              <ErrorText>{errors.weight?.message}</ErrorText>
            ) : null}
          </View>
          <View className="flex flex-1 flex-col">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  label="Altura"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name={'height'}
            />
            {errors.height?.message ? (
              <ErrorText>{errors.height?.message}</ErrorText>
            ) : null}
          </View>
        </View>
        <View className="mb-3 flex flex-col">
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Gênero"
                options={['Selecione', 'Masculino', 'Feminino']}
                selected={value}
                setSelected={onChange}
              />
            )}
            name="gender"
          />
          {errors.gender ? (
            <ErrorText>{errors.gender.message}</ErrorText>
          ) : null}
        </View>
        <View className="mb-3 flex flex-col">
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Objetivo"
                options={[
                  'Selecione',
                  'Hipertrofia',
                  'Emagrecimento',
                  'Saúde',
                  'Definição Muscular',
                  'Outros',
                ]}
                selected={value}
                setSelected={onChange}
              />
            )}
            name="objective"
          />
          {errors.objective ? (
            <ErrorText>{errors.objective.message}</ErrorText>
          ) : null}
        </View>
        <View className="mb-3 flex flex-col">
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Condicionamento Físico"
                options={[
                  'Selecione',
                  'Sedentário',
                  'Iniciante',
                  'Intermediário',
                  'Avançado',
                  'Atleta',
                ]}
                selected={value}
                setSelected={onChange}
              />
            )}
            name="activityLevel"
          />
          {errors.activityLevel ? (
            <ErrorText>{errors.activityLevel.message}</ErrorText>
          ) : null}
        </View>
        <View className="flex flex-col">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextArea
                label="Observações"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="observations"
          />
          {errors.observations?.message ? (
            <ErrorText>{errors.observations?.message}</ErrorText>
          ) : null}
        </View>

        <View className="mb-11 pb-6 pt-6">
          <FitButton.Root variant="primary" onPress={handleSubmit(onSubmit)}>
            <FitButton.Icon icon={Check} />
            <FitButton.Text>Salvar</FitButton.Text>
          </FitButton.Root>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProfile;
