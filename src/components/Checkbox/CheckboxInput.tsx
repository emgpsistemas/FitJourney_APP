import { Text, TextInputProps, View } from 'react-native';
import { Input } from '../ui/Input';

interface CheckboxInputProps extends TextInputProps {
  label: string;
  required?: boolean;
  lastTraining: string;
  error?: string;
}

function CheckboxInput({
  label,
  lastTraining,
  required,
  error,
  ...rest
}: CheckboxInputProps) {
  return (
    <View className="flex flex-1 flex-col">
      <Input label={label} required={required} maxLength={3} {...rest} />
      <Text className="font-openNormal text-xs text-zinc-900">
        Último Treino: {lastTraining}
      </Text>
      {error ? (
        <Text className="font-openNormal text-xs text-red-500">{error}</Text>
      ) : null}
    </View>
  );
}

export default CheckboxInput;
