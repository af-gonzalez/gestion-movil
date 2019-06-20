import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
  formContainer: ViewStyle;
  input: ViewStyle;
  inputBoxStyle: ViewStyle;
  restorePassText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 25,
  },
  formContainer: {
    flex: 1,
    borderRadius: 4,
    shadowOpacity: 0.3,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,1)',
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
    marginTop: 20,
    fontFamily: Fonts.Light,
    fontSize: FontSizes.normal,
    color: '#6087AF',
  },
});
