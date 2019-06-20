import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  itemContainer: ViewStyle;
  titleSection: ViewStyle;
  title: TextStyle;
  controlsSection: ViewStyle;
  controlsBox: ViewStyle;
  amount: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  itemContainer: {
    minHeight: 50,
    alignSelf: 'stretch',
    paddingRight: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginBottom: 4,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.dark,
    marginLeft: 10,
  },
  controlsSection: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  controlsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    height: 40,
    borderRadius: 3,
    justifyContent: 'space-around',
    backgroundColor: Colors.lightGray,
  },
  amount: {
    fontFamily: Fonts.Bold,
    fontSize: FontSizes.small,
    color: Colors.dark,
    width: 40,
    textAlign: 'center',
  },
});
