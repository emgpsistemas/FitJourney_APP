import { Check, PencilSimple, X } from 'phosphor-react-native';
import { useState } from 'react';
import { Text } from 'react-native';
import colors from 'tailwindcss/colors';
import { FitButton } from '../ui/FitButton';
import { IconButton } from '../ui/IconButton';
import { CustomModal } from '../ui/Modal';

export function EditExerciseModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <IconButton onPress={() => setIsModalVisible(true)}>
        <PencilSimple size={20} weight="bold" color={colors.yellow[400]} />
      </IconButton>

      {/* Modal */}
      <CustomModal.Root isOpen={isModalVisible} onClose={setIsModalVisible}>
        <CustomModal.Header>
          <CustomModal.Title>Editar Exercício</CustomModal.Title>
          <CustomModal.CloseButton onClose={setIsModalVisible} />
        </CustomModal.Header>
        <CustomModal.Body>
          <Text>Teste</Text>
        </CustomModal.Body>
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
              <FitButton.Text>Salvar</FitButton.Text>
            </FitButton.Root>
          </CustomModal.FooterButtonContainer>
        </CustomModal.Footer>
      </CustomModal.Root>
    </>
  );
}
