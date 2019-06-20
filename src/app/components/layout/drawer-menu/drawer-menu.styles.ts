import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
  contentArea: ViewStyle;
  header: ViewStyle;
  avatarContainer: ViewStyle;
  userAvatar: ImageStyle,
  userName: TextStyle,
  closeSessionLinkContainer: ViewStyle,
  closeSessionLink: TextStyle,
  editInfoButton: ViewStyle,
  editInfoText: TextStyle,
};

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    backgroundColor: Colors.lightGray,
  },
  contentArea: {
    flex: 1,
  },
  header: {
    alignSelf: 'stretch',
    height: 105,
    backgroundColor: Colors.dark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  avatarContainer: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 10,
    backgroundColor: Colors.white,
  },
  userAvatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  userName: {
    fontFamily: Fonts.Bold,
    color: Colors.white,
    fontSize: 18,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  closeSessionLinkContainer: {
    marginTop: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  closeSessionLink: {
    fontFamily: Fonts.Regular,
    color: Colors.lightBlue,
    fontSize: 15,
  },
  editInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  editInfoText: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.small,
    color: Colors.white,
    marginLeft: 5,
  },
});
