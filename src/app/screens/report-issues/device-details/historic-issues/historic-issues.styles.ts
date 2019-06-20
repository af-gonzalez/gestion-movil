import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../../config/constants/styles';

type ComponentStyles = {
  itemContainer: ViewStyle;
  descriptionSection: ViewStyle;
  descriptionTitle: TextStyle;
  descriptionText: TextStyle;
  dateContainer: ViewStyle;
  dateText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  itemContainer: {
    backgroundColor: Colors.white,
    marginBottom: 4,
    justifyContent: 'space-around',
    position: 'relative',
    minHeight: 40,
    padding: 10,
  },
  descriptionSection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  descriptionTitle: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.small,
    color: Colors.dark,
    marginRight: 10,
  },
  descriptionText: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.small,
    color: Colors.blue,
  },
  dateContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.lightBlue3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
  },
  dateText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.smaller,
    color: Colors.dark,
  },
});
