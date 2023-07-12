import { CaretDown } from 'phosphor-react-native';
import { useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'tailwindcss/colors';
import { toggleAnimations } from '../../animations/ToggleAnimations';

interface AccordionRootProps {
  children: React.ReactNode;
  title: string;
}

function AccordionRoot({ children, title }: AccordionRootProps) {
  const [showContent, setShowContent] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimations);
    setShowContent(!showContent);
  };

  const arrowRotation = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mb-4 flex flex-col overflow-hidden rounded-lg bg-zinc-100 p-6"
      onPress={() => toggleListItem()}
    >
      <View className="flex flex-row justify-between">
        <Text className="font-openBold text-base text-zinc-900">
          {title.toLocaleUpperCase()}
        </Text>
        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
          <CaretDown size={24} color={colors.zinc[900]} weight="bold" />
        </Animated.View>
      </View>
      {showContent ? children : null}
    </TouchableOpacity>
  );
}

export default AccordionRoot;
