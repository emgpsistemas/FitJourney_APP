import { useNavigation } from "@react-navigation/native";
import { Barbell, ListPlus, UserCircle } from "phosphor-react-native";
import { Text, View } from "react-native";
import HomeImageSVG from "../../../assets/images/svg/home.svg";
import { LogoutButton } from "../../../components/LogoutButton";
import { FitButton } from "../../../components/ui/FitButton";

export default function Home() {
  const user = "Fulano";
  const { navigate } = useNavigation();

  return (
    <View className="flex flex-1 flex-col bg-neutral-50 px-5 py-10">
      <View className="w-24 self-end ">
        <LogoutButton />
      </View>
      <View className="mb-10 mt-8">
        <HomeImageSVG width={"100%"} />
      </View>

      <Text className="font-openBold text-2xl text-zinc-900">
        Olá {user}, bem vindo!
      </Text>
      <View className="mt-10 flex flex-1 items-center justify-center space-y-3 ">
        <FitButton.Root variant="primary" onPress={() => navigate("Exercises")}>
          <FitButton.Icon icon={ListPlus} />
          <FitButton.Text>Exercícios</FitButton.Text>
        </FitButton.Root>

        <FitButton.Root variant="primary" onPress={() => navigate("Profile")}>
          <FitButton.Icon icon={UserCircle} />
          <FitButton.Text>Perfil</FitButton.Text>
        </FitButton.Root>

        <FitButton.Root
          variant="primary"
          onPress={() => navigate("RegisteredTrainings")}
        >
          <FitButton.Icon icon={Barbell} />
          <FitButton.Text>Treinos</FitButton.Text>
        </FitButton.Root>
      </View>
    </View>
  );
}
