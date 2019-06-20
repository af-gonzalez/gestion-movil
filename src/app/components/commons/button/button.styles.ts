import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Fonts } from '../../../../config/constants/styles';

type ComponentStyles = {
  buttonContainer: ViewStyle,
  buttonText: TextStyle,
};

export const buttonStyles = StyleSheet.create<ComponentStyles>({
  buttonContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Fonts.Medium,
  },
});
