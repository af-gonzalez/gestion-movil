import { StyleSheet, TextStyle, ViewStyle, Dimensions, ImageStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

const { width } = Dimensions.get('window');

type ComponentProps = {
  titleContainer: ViewStyle;
  imageSection: ViewStyle;
  image: ImageStyle;
  titleSection: ViewStyle;
  title: TextStyle;
  videoBox: ViewStyle;
};

export const styles = StyleSheet.create<ComponentProps>({
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  imageSection: {
    height: 70,
    width: 70,
    backgroundColor: Colors.white,
    borderRadius: 3,
    marginRight: 5,
    shadowRadius: 2,
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  titleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 3,
    shadowRadius: 2,
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.dark,
  },
  videoBox: {
    marginRight: 10,
    marginLeft: 10,
    width: width - 20,
    height: width - 20,
    backgroundColor: Colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
