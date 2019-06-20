import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  sectionTitle: ViewStyle;
  sectionTitleText: TextStyle;
  emptyListMessageContainer: ViewStyle;
  emptyListMessage: TextStyle;
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
  emptyListMessageContainer: {
    marginHorizontal: 20,
    alignSelf: 'stretch',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.white,
  },
  emptyListMessage: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    color: Colors.dark,
    textAlign: 'center',
  },
});
