import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
  formContainer: ViewStyle;
  input: ViewStyle;
  inputBoxStyle: ViewStyle;
  restorePassText: TextStyle;
  listItem: ViewStyle;
  listItemText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  formContainer: {
    flex: 1,
    borderRadius: 4,
    shadowOpacity: 0.3,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    marginTop: 10,
    shadowOpacity: 0.1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderWidth: 0,
  },
  inputBoxStyle: {
    paddingHorizontal: 15,
    height: 55,
  },
  restorePassText: {
    marginTop: 10,
    fontFamily: Fonts.Light,
    fontSize: FontSizes.small,
    color: '#336EA9',
  },
  listItem: {
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: 50,
    alignSelf: 'stretch',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  listItemText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.dark,
    marginLeft: 15,
  },
});
