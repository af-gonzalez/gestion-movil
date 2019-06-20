import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentProps = {
  container: ViewStyle;
  titleSection: ViewStyle;
  title: TextStyle;
};

export const styles = StyleSheet.create<ComponentProps>({
  container: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.dark,
  },
});
