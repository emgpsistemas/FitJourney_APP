import { zodResolver } from '@hookform/resolvers/zod';
import { Check, PencilSimple, X } from 'phosphor-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import colors from 'tailwindcss/colors';
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
  category: string;
  description: string;
}

interface EditExerciseModalProps {
  exercise: Exercise;
}

export function EditExerciseModal({
  exercise: { category, description, name },
}: EditExerciseModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditExerciseModalFormData>({
    defaultValues: {
      name: name,
      category: category,
      description: description,
    },
    resolver: zodResolver(editExerciseModalSchema),
  });

  const onSubmit = (data: EditExerciseModalFormData) => {
    try {
      console.log('PAYLOAD =>', data);
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
                  label="Categoria"
                  options={['Selecione', 'Peito', 'Ombros', 'Pernas']}
                  selected={value}
                  setSelected={onChange}
                />
              )}
              name="category"
            />
            {errors.category?.message ? (
              <ErrorText>{errors.category?.message}</ErrorText>
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
