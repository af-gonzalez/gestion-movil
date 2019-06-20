import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
  formContainer: ViewStyle;
  restorePassText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    flex: 1,
  },
  formContainer: {
    alignSelf: 'stretch',
    borderWidth: 0,
    borderColor: '#F2F0F0',
    borderRadius: 5,
    height: 230,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  restorePassText: {
    marginTop: 20,
    fontFamily: Fonts.Light,
    fontSize: FontSizes.normal,
    color: Colors.blue2,
    //textShadowRadius: 4,
    //textShadowColor: 'black',
    //textShadowOffset: { width: 1, height: 1 },
  },
});
