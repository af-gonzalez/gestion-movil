import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '@constants/styles';

type ComponentStyles = {
  cardContainer: ViewStyle;
  imageSection: ViewStyle;
  infoSection: ViewStyle;
  profileImage: ImageStyle;
  supportUserName: TextStyle;
  timeRow: ViewStyle;
  timeTitle: TextStyle;
  timeDesc: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  cardContainer: {
    alignSelf: 'stretch',
    height: 80,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginBottom: 5,
  },
  imageSection: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  supportUserName: {
    fontFamily: Fonts.Medium,
    color: Colors.dark,
    fontSize: FontSizes.small,
  },
  timeRow: {
    flexDirection: 'row',
  },
  timeTitle: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.small,
    color: Colors.gray,
    width: 80,
  },
  timeDesc: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
});
