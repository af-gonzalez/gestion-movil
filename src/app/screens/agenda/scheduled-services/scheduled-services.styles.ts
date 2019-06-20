import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  footerView: ViewStyle;
  footerActionsContainer: ViewStyle;
  footerButtonContainer: ViewStyle;
  footerAction: ViewStyle;
  footerActionText: TextStyle;
  footerCloseActionText: TextStyle;
  sectionTitle: ViewStyle;
  sectionTitleText: TextStyle;
  activeService: ViewStyle;
  activeServiceInfo: ViewStyle;
  activeServiceButtons: ViewStyle;
  activeServiceButton: ViewStyle;
  itemField: ViewStyle;
  itemFieldTitle: TextStyle;
  itemFieldDescriptionContainer: TextStyle,
  itemFieldDescription: TextStyle;
  verticalDivisor: ViewStyle,
};

export const styles = StyleSheet.create<ComponentStyles>({
  footerView: {
    height: 70,
    backgroundColor: Colors.white,
    padding: 10,
    flexDirection: 'row',
  },
  footerActionsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  footerButtonContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  footerAction: {
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
  },
  footerActionText: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.tiny,
    color: Colors.dark,
    textAlign: 'center',
  },
  footerCloseActionText: {
    textAlign: 'center',
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.tiny,
    color: Colors.darkGray,
  },
  sectionTitle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleText: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.small,
    color: Colors.gray,
    marginLeft: 10,
  },
  activeService: {
    alignSelf: 'stretch',
    minHeight: 150,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  activeServiceInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  activeServiceButtons: {
    flexDirection: 'row',
  },
  activeServiceButton: {
    flex:1,
    padding: 10,
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
});
