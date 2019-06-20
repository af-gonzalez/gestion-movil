import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  modalContent: ViewStyle;
  avatarImage: ImageStyle;
  name: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  modalContent: {
    minHeight: 150,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.dark,
    textAlign: 'center',
  },
});
