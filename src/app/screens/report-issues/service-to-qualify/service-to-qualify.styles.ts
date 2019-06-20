import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  modalContent: ViewStyle;
  technicianInfoContainer: ViewStyle;
  imageSection: ViewStyle;
  image: ImageStyle;
  infoSection: ViewStyle;
  name: TextStyle;
  date: TextStyle;
  serviceInfoContainer: ViewStyle;
  titleSection: ViewStyle;
  descriptionSection: ViewStyle;
  title: TextStyle;
  description: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  modalContent: {
    backgroundColor: Colors.white,
  },
  technicianInfoContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 10,
  },
  imageSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  infoSection: {
    flex: 2,
    justifyContent: 'center',
  },
  name: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.small,
    color: Colors.dark,
  },
  date: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.blue,
  },
  serviceInfoContainer: {
    alignSelf: 'stretch',
    padding: 10,
  },
  titleSection: {
    flex: 1,
  },
  descriptionSection: {
    flex: 2,
  },
  title: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.small,
    color: Colors.dark,
  },
  description: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.blue,
  },
});
