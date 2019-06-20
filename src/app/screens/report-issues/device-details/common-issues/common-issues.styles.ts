import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../../config/constants/styles';

type ComponentStyles = {
  itemContainer: ViewStyle;
  titleSection: ViewStyle;
  title: TextStyle;
  subTitle: TextStyle;
  text: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  itemContainer: {
    padding: 10,
    backgroundColor: Colors.white,
    marginBottom: 4,
  },
  titleSection: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  title: {
    marginLeft: 5,
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    color: Colors.dark,
  },
  subTitle: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.blue,
  },
  text: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.smaller,
    color: Colors.blue,
    textAlign: 'justify',
  },
});
