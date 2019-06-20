import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  modalContent: ViewStyle;
  title: TextStyle;
  text: TextStyle;
};

export const loadingChatStyles = StyleSheet.create<ComponentStyles>({
  modalContent: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    color: Colors.dark,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.blue,
    textAlign: 'center',
    marginBottom: 20,
  },
});
