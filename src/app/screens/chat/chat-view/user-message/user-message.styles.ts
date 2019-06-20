import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
  avatarContainer: ViewStyle;
  avatarContent: ViewStyle;
  avatar: ImageStyle;
  messageContainer: ViewStyle;
  messageText: TextStyle;
  userName: TextStyle;
  timeContainer: ViewStyle;
  time: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  avatarContainer: {
    paddingLeft: 10,
  },
  avatarContent: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    shadowOpacity: 0.2,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  messageContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.white,
    shadowOpacity: 0.2,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    justifyContent: 'center',
  },
  userName: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.smaller,
    color: Colors.dark,
  },
  messageText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.blue,
  },
  timeContainer: {
    width: 50,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  time: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.smaller,
    color: Colors.gray,
    textAlign: 'center',
  },
});
