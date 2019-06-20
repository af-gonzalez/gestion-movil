import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@constants/styles';

type ComponentStyles = {
  input: ViewStyle;
  inputBoxStyle: ViewStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  input: {
    marginTop: 10,
    shadowOpacity: 0.1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderWidth: 0,
    alignSelf: 'stretch',
  },
  inputBoxStyle: {
    paddingHorizontal: 15,
    height: 55,
  },
});
