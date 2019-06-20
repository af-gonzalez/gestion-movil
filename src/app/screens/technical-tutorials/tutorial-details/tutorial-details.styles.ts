import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentProps = {
  titleContainer: ViewStyle;
  title: TextStyle;
  detailsBox: ViewStyle;
  detailsText: TextStyle;
};

export const styles = StyleSheet.create<ComponentProps>({
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
  detailsBox: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.white,
    padding: 10,
  },
  detailsText: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.small,
    color: Colors.blue,
  },
});
