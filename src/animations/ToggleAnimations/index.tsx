import { LayoutAnimation } from 'react-native';

export const toggleAnimations = {
  duration: 300,
  update: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  delete: {
    duration: 200,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};
