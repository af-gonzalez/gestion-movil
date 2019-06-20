import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '@constants/styles';

type ComponentStyles = {
  title: TextStyle;
  userInfo: ViewStyle;
  userImage: ImageStyle;
  username: TextStyle;
  message: TextStyle;
  divisor: ViewStyle;
  messageContainer: ViewStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  title: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.title,
    color: Colors.dark,
    alignSelf: 'center',
    marginBottom: 20,
  },
  userInfo: {
    alignSelf: 'stretch',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.blue,
  },
  message: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.blue2,
  },
  divisor: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: Colors.yellow,
    marginVertical: 5,
    opacity: 0.5,
  },
  messageContainer: {
    padding: 20,
    backgroundColor: Colors.lightGray2,
  },
});
