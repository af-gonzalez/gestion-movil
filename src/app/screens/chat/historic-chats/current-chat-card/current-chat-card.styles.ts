import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '@constants/styles';

type ComponentStyles = {
  cardContainer: ViewStyle;
  cardContent: ViewStyle;
  iconContainer: ViewStyle;
  loadingDescription: ViewStyle;
  loadingTitle: TextStyle;
  loadingMessage: TextStyle;
  userImage: ImageStyle;
  userName: TextStyle;
  linkContainer: ViewStyle;
  linkMessage: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  cardContainer: {
    alignSelf: 'stretch',
    height: 80,
    backgroundColor: Colors.white,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDescription: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingTitle: {
    fontFamily: Fonts.Bold,
    fontSize: FontSizes.normal,
    color: Colors.dark,
  },
  loadingMessage: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.blue,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    color: Colors.blue,
    fontSize: FontSizes.normal,
    fontFamily: Fonts.Regular,
  },
  linkContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
  },
  linkMessage: {
    color: Colors.white,
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.smaller,
    textAlign: 'center',
    marginBottom: 0,
  },
});
