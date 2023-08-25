import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Check } from 'phosphor-react-native';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ErrorText } from '../../../components/ErrorText';
import { ScreenTitle } from '../../../components/ScreenTitle';
import { FitButton } from '../../../components/ui/FitButton';
import { InputComposed } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { TextArea } from '../../../components/ui/Textarea/index';
import { useExercises } from '../../../hooks/useExercises';
import { toastConfig } from '../../../lib/toast/config';
import { uniqueID } from '../../../utils/uniqueID';
import {
  NewExerciseFormData,
  newExerciseFormSchema,
} from '../../../validations/common/CreateExercise';

export function RegisterExercise() {
  const { allMuscleGroups, createExercise } = useExercises();
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<NewExerciseFormData>({
    defaultValues: {
      id: 0,
      name: '',
      muscle_group: '',
      description: '',
    },
    resolver: zodResolver(newExerciseFormSchema),
  });

  const muscleGroupsNames = allMuscleGroups.map(
    (muscleGroup) => muscleGroup.name,
  );

  const muscleGroupsOptions = [
    'Selecione o Grupo Muscular',
    ...muscleGroupsNames.sort((a, b) => a.localeCompare(b)),
  ];

  async function handleRegisterExercise(data: NewExerciseFormData) {
    try {
      const payload: NewExerciseFormData = {
        ...data,
        id: uniqueID(),
      };
      await createExercise(payload);
      Toast.show({
        type: 'success',
        text1: 'Exercício cadastrado com sucesso!',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar exercício!',
        text2: 'Tente novamente',
        position: 'bottom',
      });
      console.error('handleRegisterExercise function error:', error);
    } finally {
      reset();
      setTimeout(() => {
        navigate('RegisteredExercises');
      }, 2000);
    }
  }

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-neutral-50 px-5 py-5">
      <ScreenTitle.Root>
        <ScreenTitle.GoBackButton />
        <ScreenTitle.Text>Cadastrar Exercício</ScreenTitle.Text>
      </ScreenTitle.Root>

      <View className="mt-10 flex flex-1 justify-start space-y-4">
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputComposed.Root>
                <InputComposed.Label label="Nome" />
                <InputComposed.Text
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </InputComposed.Root>
            )}
            name="name"
          />
          {errors.name?.message ? (
            <ErrorText>{errors.name?.message}</ErrorText>
          ) : null}
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Grupo Muscular"
                options={muscleGroupsOptions}
                selected={value}
                setSelected={onChange}
              />
            )}
            name="muscle_group"
          />
          {errors.muscle_group?.message ||
          getValues().description === 'Selecione o Grupo Muscular' ? (
            <ErrorText>Um grupo muscular deve ser selecionado</ErrorText>
          ) : null}
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextArea
                label="Descrição"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="description"
          />
          {errors.description?.message ? (
            <ErrorText>{errors.description?.message}</ErrorText>
          ) : null}
        </View>
        <FitButton.Root
          variant="primary"
          onPress={handleSubmit(handleRegisterExercise)}
        >
          <FitButton.Icon icon={Check} />
          <FitButton.Text>Finalizar Cadastro</FitButton.Text>
        </FitButton.Root>
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
