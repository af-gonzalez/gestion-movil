import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
  imageSection: ViewStyle;
  linkSection: ViewStyle;
  linkSectionText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    alignSelf: 'stretch',
    height: 85,
    flexDirection: 'row',
  },
  imageSection: {
    width: 85,
    backgroundColor: Colors.lightGray2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkSectionText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.blue,
    marginLeft: 10,
  },
});
