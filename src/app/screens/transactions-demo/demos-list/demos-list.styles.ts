import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentProps = {
  container: ViewStyle;
  titleSection: ViewStyle;
  title: TextStyle;
  boxContainer: ViewStyle;
  imageSection: ViewStyle;
  deviceImage: ImageStyle;
  selectBoxSection: ViewStyle;
};

export const styles = StyleSheet.create<ComponentProps>({
  container: {
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.small,
    color: Colors.dark,
  },
  boxContainer: {
    alignSelf: 'stretch',
    padding: 10,
    flexDirection: 'row',
  },
  imageSection: {
    height: 70,
    width: 70,
    backgroundColor: Colors.white,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceImage: {
    height: 50,
    width: 50,
  },
  selectBoxSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
