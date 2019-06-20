import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../../config/constants/styles';

type ComponentStyles = {
  modalContent: ViewStyle;
  signatureBox: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  undoButton: ViewStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  modalContent: {
    padding: 10,
  },
  signatureBox: {
    alignSelf: 'stretch',
    height: 200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowColor: Colors.darkGray,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  titleContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.dark,
  },
  undoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.darkGray,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginTop: 10,
  },
});
