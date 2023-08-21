import { zodResolver } from '@hookform/resolvers/zod';
import { Check, PencilSimple, X } from 'phosphor-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import colors from 'tailwindcss/colors';
import { useExercises } from '../../hooks/useExercises';
import {
  EditExerciseModalFormData,
  editExerciseModalSchema,
} from '../../validations/User/EditExerciseModal';
import { ErrorText } from '../ErrorText';
import { FitButton } from '../ui/FitButton';
import { IconButton } from '../ui/IconButton';
import { Input } from '../ui/Input';
import { CustomModal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { TextArea } from '../ui/Textarea';

interface Exercise {
  id: number;
  name: string;
  muscle_group: string;
  description: string;
}

interface EditExerciseModalProps {
  exercise: Exercise;
}

export function EditExerciseModal({
  exercise: { muscle_group, description, name, id },
}: EditExerciseModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateExercise, allMuscleGroups } = useExercises();

  const muscleGroupsNames = allMuscleGroups
    .map((muscleGroup) => muscleGroup.name)
    .sort((a, b) => a.localeCompare(b));

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditExerciseModalFormData>({
    defaultValues: {
      id: id,
      name: name,
      muscle_group: muscle_group,
      description: description,
    },
    resolver: zodResolver(editExerciseModalSchema),
  });

  const onSubmit = (data: EditExerciseModalFormData) => {
    try {
      updateExercise(data);
    } catch (error: any) {
      console.log('ERROR =>', error);
    } finally {
      reset();
      setIsModalVisible(false);
    }
  };

  return (
    <>
      {/* Modal Trigger */}
      <IconButton onPress={() => setIsModalVisible(true)}>
        <PencilSimple size={20} weight="bold" color={colors.yellow[400]} />
      </IconButton>

      {/* Modal */}
      <CustomModal.Root isOpen={isModalVisible} onClose={setIsModalVisible}>
        {/* Header */}
        <CustomModal.Header>
          <CustomModal.Title>Editar Exercício</CustomModal.Title>
          <CustomModal.CloseButton onClose={setIsModalVisible} />
        </CustomModal.Header>

        {/* Body */}
        <CustomModal.Body>
          <View className="mb-3 flex flex-col">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Nome"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="name"
            />
            {errors.name?.message ? (
              <ErrorText>{errors.name?.message}</ErrorText>
            ) : null}
          </View>
          <View className="mb-3 flex flex-col">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Grupo Muscular"
                  options={['Selecione', ...muscleGroupsNames]}
                  selected={value}
                  setSelected={onChange}
                />
              )}
              name="muscle_group"
            />
            {errors.muscle_group?.message ? (
              <ErrorText>{errors.muscle_group?.message}</ErrorText>
            ) : null}
          </View>
          <View className="mb-3 flex flex-col">
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
        </CustomModal.Body>

        {/* Footer */}
        <CustomModal.Footer>
          <CustomModal.FooterButtonContainer>
            <FitButton.Root
              variant="outline"
              onPress={() => setIsModalVisible(false)}
            >
              <FitButton.Icon icon={X} />
              <FitButton.Text>Cancelar</FitButton.Text>
            </FitButton.Root>
          </CustomModal.FooterButtonContainer>
          <CustomModal.FooterButtonContainer>
            <FitButton.Root variant="primary" onPress={handleSubmit(onSubmit)}>
              <FitButton.Icon icon={Check} />
              <FitButton.Text>Salvar</FitButton.Text>
            </FitButton.Root>
          </CustomModal.FooterButtonContainer>
        </CustomModal.Footer>
      </CustomModal.Root>
    </>
  );
}
