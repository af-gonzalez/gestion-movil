import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  modalContent: ViewStyle;
  message: TextStyle;
  closeButtonContainer: ViewStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  modalContent: {
    alignSelf: 'stretch',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  message: {
    textAlign: 'center',
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.dark,
  },
  closeButtonContainer: {
    zIndex: 2,
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'none',
  },
});
