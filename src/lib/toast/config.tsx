import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        height: 80,
      }}
      text1Style={{
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};
