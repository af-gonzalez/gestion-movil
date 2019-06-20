import { Dimensions, ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
  messageInputBox: ViewStyle;
  inputSection: ViewStyle;
  buttonSection: ViewStyle;
  serviceDeskUserBox: ViewStyle;
  avatarSection: ViewStyle;
  avatarContent: ViewStyle;
  avatar: ImageStyle;
  nameSection: ViewStyle;
  name: TextStyle;
};

const dim = Dimensions.get('window');

function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    backgroundColor: Colors.lightGray3,
    flex: 1,
    paddingTop: 0,
  },
  messageInputBox: {
    minHeight: isIPhoneXSize(dim) ? 90 : 60,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: isIPhoneXSize(dim) ? 30 : 10,
    backgroundColor: Colors.lightGray,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputSection: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonSection: {
    width: 110,
    paddingLeft: 10,
  },
  serviceDeskUserBox: {
    height: 60,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    paddingHorizontal: 50,
    justifyContent: 'center',
  },
  avatarSection: {
    width: 50,
    alignItems: 'center',
  },
  avatarContent: {
    width: 40,
    height: 40,
    borderRadius:20,
    backgroundColor: Colors.white,
    shadowOpacity: 0.2,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius:20,
  },
  nameSection: {
    alignItems: 'center',
  },
  name: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    color: Colors.dark,
  },
});
