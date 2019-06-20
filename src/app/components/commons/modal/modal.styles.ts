import { StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { Colors } from '../../../../config/constants/styles';

const { height } = Dimensions.get('window');

type ComponentStyles = {
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalBox: ViewStyle;
  buttonsContainer: ViewStyle;
  button: ViewStyle;
};

const dim = Dimensions.get('window');

function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

export const styles = StyleSheet.create<ComponentStyles>({
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalContent: {
    maxHeight: height - 80,
    padding: 15,
    backgroundColor: Colors.lightGray,
  },
  modalBox: {
    backgroundColor: Colors.white,
    alignSelf: 'stretch',
    borderRadius: 4,
    shadowOpacity: 0.4,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: 'hidden',
    marginTop: isIPhoneXSize(dim) ? 20 : 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
});
