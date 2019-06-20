import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
});
