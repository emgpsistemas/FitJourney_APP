import { SpeakerHigh } from 'phosphor-react-native';
import { View } from 'react-native';
import { FitButton } from '../components/FitButton';

export default function Home() {
  return (
    <View className="flex h-screen w-screen items-center justify-center ">
      <FitButton.Root variant="primary" onPress={() => {}}>
        {/* <FitButton.Icon icon={SpeakerHigh} /> */}
        <FitButton.Text content="Primary" />
      </FitButton.Root>

      <FitButton.Root variant="outline" onPress={() => {}}>
        <FitButton.Icon icon={SpeakerHigh} />
        <FitButton.Text content="Outline" />
      </FitButton.Root>

      <FitButton.Root variant="ghost" onPress={() => {}}>
        <FitButton.Icon icon={SpeakerHigh} />
        <FitButton.Text content="Ghost" />
      </FitButton.Root>
    </View>
  );
}
