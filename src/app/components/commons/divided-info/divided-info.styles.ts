import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  itemField: ViewStyle;
  itemFieldTitleContainer: ViewStyle;
  itemFieldTitle: TextStyle;
  itemFieldDescriptionContainer: TextStyle,
  itemFieldDescription: TextStyle;
  itemFieldDescriptionSpan: TextStyle;
  verticalDivisor: ViewStyle,
};

export const styles = StyleSheet.create<ComponentStyles>({
  itemField: {
    flexDirection: 'row',
    minHeight: 23,
  },
  itemFieldTitleContainer: {
    justifyContent: 'center',
    flex: 1,
    flexGrow: 1.5,
  },
  itemFieldTitle: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.smaller,
    color: Colors.dark,
  },
  itemFieldDescriptionContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemFieldDescription: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.smaller,
    color: Colors.blue,
  },
  itemFieldDescriptionSpan: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.smaller,
    color: Colors.gray,
  },
  verticalDivisor: {
    backgroundColor: Colors.lightGray2,
    width: 1,
    marginRight: 10,
  },
});
