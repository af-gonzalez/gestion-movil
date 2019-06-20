import { StyleSheet, TextStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  sectionTitle: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  sectionTitle: {
    marginVertical: 5,
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    color: Colors.dark,
  },
});
