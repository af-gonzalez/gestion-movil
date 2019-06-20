import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  modalContent: ViewStyle;
  message: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  modalContent: {
    alignSelf: 'stretch',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: FontSizes.normal,
    fontFamily: Fonts.Medium,
    color: Colors.dark,
    textAlign: 'center',
  },
});
