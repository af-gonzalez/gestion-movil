import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  headerMenu: ViewStyle;
  headerItem: ViewStyle;
  headerItemText: TextStyle;
  content: ViewStyle;

};

export const styles = StyleSheet.create<ComponentStyles>({
  headerMenu: {
    alignSelf: 'stretch',
    height: 45,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Colors.darkGray,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    flexDirection: 'row',
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerItemText: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
  },
  content: {
    paddingVertical: 10,
    flex: 1,
  },
});
