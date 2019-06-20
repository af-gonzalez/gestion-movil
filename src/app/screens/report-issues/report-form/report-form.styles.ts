import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  issuesContainer: ViewStyle;
  itemContainer: ViewStyle;
  titleSection: ViewStyle;
  title: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  issuesContainer: {
    flex: 1,
    marginVertical: 10,
  },
  itemContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: 4,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height: 40,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.dark,
    marginLeft: 10,
  },
});
