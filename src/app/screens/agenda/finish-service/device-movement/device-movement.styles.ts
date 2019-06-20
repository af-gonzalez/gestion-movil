import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../../config/constants/styles';

type ComponentStyles = {
  modalContent: ViewStyle;
  sectionTitle: ViewStyle;
  sectionTitleText: TextStyle;
  divisor: ViewStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  modalContent: {
    backgroundColor: Colors.lightGray,
    padding: 15,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleText: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    color: Colors.dark,
    marginLeft: 10,
  },
  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.darkGray,
    alignSelf: 'center',
    marginBottom: 10,
    opacity: 0.3,
  },
});
