import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  menuItemContainer: ViewStyle;
  title: TextStyle;
  linkContainer: ViewStyle,
  linkTouchable: ViewStyle,
};

export const styles = StyleSheet.create<ComponentStyles>({
  menuItemContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 4,
    backgroundColor: Colors.white,
    height: 60,
    position: 'relative',
  },
  title: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    color: Colors.blue,
    marginLeft: 20,
  },
  linkContainer: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  linkTouchable: {
    padding: 10,
  },
});
