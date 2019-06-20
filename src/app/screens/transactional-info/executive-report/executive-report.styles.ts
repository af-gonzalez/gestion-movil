import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  sectionTitleContainer: ViewStyle;
  sectionTitleText: TextStyle;
  itemContainer: ViewStyle;
  itemText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  sectionTitleContainer: {
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 10,
  },
  sectionTitleText: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    color: Colors.dark,
  },
  itemContainer: {
    paddingHorizontal: 10,
    marginBottom: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    height: 40,
  },
  itemText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.dark,
  },
});
