import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../../config/constants/styles';

type ComponentStyles = {
  itemContainer: ViewStyle;
  visibleContent: ViewStyle;
  expandableContent: ViewStyle;
  hiddenLeftSection: ViewStyle;
  hiddenRightSection: ViewStyle;
  clockBox: ViewStyle;
  clockTime: TextStyle;
  expandItemButton: ViewStyle;
  itemField: ViewStyle;
  itemFieldTitle: TextStyle;
  itemFieldDescriptionContainer: TextStyle,
  itemFieldDescription: TextStyle;
  verticalDivisor: ViewStyle,
  initServiceButton: ViewStyle,
  initServiceButtonText: TextStyle,
  seeRatingsButton: ViewStyle,
  seeRatingsButtonText: TextStyle,
};

export const styles = StyleSheet.create<ComponentStyles>({
  itemContainer: {
    zIndex: 10000,
    alignSelf: 'stretch',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    marginBottom: 6,
    position: 'relative',
  },
  visibleContent: {
    minHeight: 115,
    position: 'relative',
    backgroundColor: Colors.white,
    padding: 10,
  },
  expandableContent: {
    alignSelf: 'stretch',
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  clockBox: {
    position: 'absolute',
    width: 110,
    height: 30,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.dark,
    borderTopLeftRadius: 15,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clockTime: {
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
  },
  hiddenLeftSection: {
    height: 115,
    paddingLeft: 15,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  hiddenRightSection: {
    height: 115,
    width: 150,
    padding: 10,
    top: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'space-around',
  },
  expandItemButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemField: {
    flexDirection: 'row',
    minHeight: 23,
  },
  itemFieldTitle: {
    flex: 1,
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.dark,
  },
  itemFieldDescriptionContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemFieldDescription: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.normal,
    color: Colors.blue,
  },
  verticalDivisor: {
    backgroundColor: Colors.lightGray2,
    width: 1,
    marginRight: 10,
  },
  initServiceButton: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Colors.gray,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  initServiceButtonText: {
    color: Colors.dark,
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    textAlign: 'center',
  },
  seeRatingsButton: {
    alignSelf: 'stretch',
    height: 35,
    backgroundColor: Colors.white,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Colors.gray,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  seeRatingsButtonText: {
    color: Colors.dark,
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.smaller,
    textAlign: 'center',
  },
});
