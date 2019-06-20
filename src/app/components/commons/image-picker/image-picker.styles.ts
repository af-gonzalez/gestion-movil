import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  modalContent: ViewStyle;
  imageSection: ViewStyle;
  buttonsSection: ViewStyle;
  defaultImage: ViewStyle;
  touchableLink: ViewStyle;
  linkText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  modalContent: {
    flexDirection: 'row',
    height: 130,
  },
  imageSection: {
    width: 130,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonsSection: {
    flex: 2,
    justifyContent: 'space-between',
  },
  defaultImage: {
    width: 120,
    height: 120,
    backgroundColor: Colors.lightGray2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableLink: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: 10,
    alignSelf: 'stretch',
  },
  linkText: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.smaller,
    color: Colors.dark,
  },
});
