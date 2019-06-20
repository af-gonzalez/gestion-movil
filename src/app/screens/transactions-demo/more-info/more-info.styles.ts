import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  buttonsContainer: ViewStyle;
  buttonWrapper: ViewStyle;
  title: TextStyle;
  buttonText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  title: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.dark,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  buttonWrapper: {
    width: 110,
    height: 110,
    backgroundColor: Colors.lightGray3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.2,
    borderRadius: 4,
  },
  buttonText: {
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.title,
    color: Colors.dark,
  },
});
