import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../../config/constants/styles';

type ComponentStyes = {
  container: ViewStyle;
  avatarContainer: ViewStyle;
  avatar: ImageStyle;
  avatarContent: ViewStyle;
  messageContainer: ViewStyle;
  messageContent: TextStyle;
  userName: TextStyle;
  timeContainer: ViewStyle;
  time: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyes>({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingRight: 0,
    alignItems: 'flex-end',
  },
  avatarContainer: {
    paddingRight: 10,
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
    backgroundColor: '#F2F6FA',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowOpacity: 0.2,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    justifyContent: 'center',
  },
  messageContent: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.small,
    color: Colors.dark,
  },
  userName: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.smaller,
    color: Colors.dark,
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
