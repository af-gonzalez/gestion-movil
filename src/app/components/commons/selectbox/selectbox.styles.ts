import { StyleSheet, TextStyle, ViewStyle, Dimensions } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

const { height } = Dimensions.get('window');

type ComponentStyles = {
  container: ViewStyle;
  inputBox: ViewStyle;
  label: TextStyle;
  modalContent: ViewStyle;
  modalBox: ViewStyle;
  modalHeader: ViewStyle;
  modalTitle: TextStyle;
  selectionItem: ViewStyle;
  selectionItemText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  container: {
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  inputBox: {
    backgroundColor: Colors.white,
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  label: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.Medium,
    color: Colors.dark,
    marginBottom: 4,
  },
  modalContent: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalBox: {
    position: 'absolute',
    left: 0,
    backgroundColor: Colors.lightGray,
    width: '100%',
    height: height / 2,
    bottom: 0,
  },
  modalHeader:{
    height: 40,
    alignSelf: 'stretch',
    backgroundColor: Colors.dark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.darkGray,
    shadowRadius: 2,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.Medium,
    color: Colors.white,
  },
  selectionItem: {
    backgroundColor: Colors.white,
    minHeight: 40,
    marginBottom: 1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Colors.darkGray,
    shadowOpacity: 0,
    paddingHorizontal: 10,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  selectionItemText: {
    fontFamily: Fonts.Light,
    fontSize: FontSizes.normal,
    color: Colors.blue,
  },
});
