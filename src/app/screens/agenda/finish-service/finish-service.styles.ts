import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  subtitleContainer: ViewStyle;
  subtitleTextSection: ViewStyle;
  subtitleIcon: ViewStyle;
  subtitle: TextStyle;
  listItem: ViewStyle;
  listItemText: TextStyle;
  paddedContent: ViewStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  subtitleContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  subtitleTextSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleIcon: {
    marginRight: 10,
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
  paddedContent: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },

});
