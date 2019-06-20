import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
  inputBox: ViewStyle;
  input: ViewStyle & TextStyle;
  labelSection: ViewStyle;
  labelTextContainer: ViewStyle;
  labelText: TextStyle;
  selectionItemText: TextStyle;
  errorMessageContainer: ViewStyle;
  errorMessage: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    width: '100%',
    position: 'relative',
  },
  inputBox: {
    minHeight: 40,
    backgroundColor: Colors.white,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.normal,
    paddingTop: 0,
    color: Colors.blue,
    textAlignVertical: 'center',
    flex: 1,
  },
  labelSection: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
  },
  labelTextContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  labelText: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.Medium,
    color: Colors.dark,
    justifyContent: 'center',
  },
  selectionItemText: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.normal,
    color: Colors.blue,
  },
  errorMessageContainer: {
    opacity: 0.8,
    borderTopColor: Colors.red,
    borderTopWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  errorMessage: {
    position: 'relative',
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.tiny,
    color: Colors.red,
    marginLeft: 3,
  },
});
