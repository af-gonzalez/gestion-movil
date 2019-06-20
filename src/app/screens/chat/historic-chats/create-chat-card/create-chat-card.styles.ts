import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '@constants/styles';

type ComponentStyles = {
  cardContainer: ViewStyle;
  messageSection: ViewStyle;
  buttonSection: ViewStyle;
  message: TextStyle;
  buttonText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  cardContainer: {
    alignSelf: 'stretch',
    height: 80,
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  messageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonSection: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
    padding: 10,
  },
  message: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  buttonText: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.smaller,
    color: Colors.white,
    textAlign: 'center',
  },
});
