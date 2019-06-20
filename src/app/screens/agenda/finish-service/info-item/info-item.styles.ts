import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../../../../config/constants/styles';

type ComponentStyles = {
  container: ViewStyle;
  buttonsContainer: ViewStyle,
  actionButton: ViewStyle,
  editButton: ViewStyle,
  removeButton: ViewStyle,
};

export const infoItemStyles = StyleSheet.create<ComponentStyles>({
  container: {
    backgroundColor: Colors.white,
    alignSelf: 'stretch',
    marginHorizontal: 10,
    padding: 10,
    position: 'relative',
    marginBottom: 10,
  },
  buttonsContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 100,
    height: 25,
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: Colors.complementary,
  },
  removeButton: {
    backgroundColor: Colors.dark,
  },
});
