import { Check, Trash, X } from 'phosphor-react-native';
import { useState } from 'react';
import { Text } from 'react-native';
import colors from 'tailwindcss/colors';
import { FitButton } from '../ui/FitButton';
import { IconButton } from '../ui/IconButton';
import { CustomModal } from '../ui/Modal';

export function DeleteExerciseModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <IconButton
        onPress={() => setIsModalVisible(true)}
        className="flex flex-row items-center justify-center rounded-lg border-2 border-red-600 p-1"
      >
        <Trash size={20} weight="bold" color={colors.red[600]} />
      </IconButton>

      {/* Modal */}
      <CustomModal.Root isOpen={isModalVisible} onClose={setIsModalVisible}>
        {/* Header */}
        <CustomModal.Header>
          <CustomModal.Title>Deletar Exercício</CustomModal.Title>
          <CustomModal.CloseButton onClose={setIsModalVisible} />
        </CustomModal.Header>

        {/* Body */}
        <CustomModal.Body>
          <Text className="text-center font-openBold text-base text-zinc-900">
            Você tem certeza que deseja deletar este exercício?
          </Text>
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
            <FitButton.Root
              variant="primary"
              onPress={() => setIsModalVisible(false)}
            >
              <FitButton.Icon icon={Check} />
              <FitButton.Text>Confirmar</FitButton.Text>
            </FitButton.Root>
          </CustomModal.FooterButtonContainer>
        </CustomModal.Footer>
      </CustomModal.Root>
    </>
  );
}
