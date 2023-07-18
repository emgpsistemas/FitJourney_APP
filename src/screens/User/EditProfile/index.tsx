import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { Input } from '../../../components/ui/Input';
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

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 pt-16">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <ScreenTitle.Text>Editar Perfil</ScreenTitle.Text>
      </ScreenTitle.Root>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex flex-1 pt-10"
      >
        <View className="mb-3 flex flex-col">
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
          {errors.name && <Text>{errors.name.message}</Text>}
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
          {errors.email && <Text>{errors.email.message}</Text>}
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
          {errors.age && <Text>{errors.age.message}</Text>}
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
            {errors.weight && <Text>{errors.weight.message}</Text>}
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
            {errors.height && <Text>{errors.height.message}</Text>}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProfile;
