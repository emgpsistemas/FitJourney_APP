import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { Modal, ModalProps, View } from 'react-native';

interface ModalRootProps extends ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export function ModalRoot({
  children,
  isOpen,
  onClose,
  ...rest
}: ModalRootProps) {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      onRequestClose={() => onClose(false)}
      statusBarTranslucent={true}
      transparent={true}
      {...rest}
    >
      <View className="flex-1 bg-overlay">
        <View
          className={clsx(
            'relative mx-auto my-auto h-fit w-[90%] max-w-xl rounded-xl bg-white',
          )}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}
