import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  imageContainer: ViewStyle;
  userImage: ImageStyle;
  imageSection: ViewStyle;
  selectButtonSection: ViewStyle;
  selectButton: ViewStyle;
  selectImageText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  imageContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: Colors.white,
    marginBottom: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.lightGray2,
  },
  imageSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonSection:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    marginBottom: 10,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  selectButton:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectImageText: {
    marginLeft: 5,
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.small,
    color: Colors.dark,
  },
});
