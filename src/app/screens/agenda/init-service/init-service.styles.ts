import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  sectionTitle: ViewStyle;
  sectionTitleText: TextStyle;
  input: ViewStyle;
  subtitleContainer: ViewStyle;
  subtitle: TextStyle;
  listItem: ViewStyle;
  listItemText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
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
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  subtitleContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: FontSizes.small,
    color: Colors.dark,
    fontFamily: Fonts.Medium,
  },
  listItem: {
    backgroundColor: Colors.white,
    height: 40,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    justifyContent: 'space-between',
  },
  listItemText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.dark,
  },
});
