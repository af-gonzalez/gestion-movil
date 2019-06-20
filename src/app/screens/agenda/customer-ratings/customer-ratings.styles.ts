import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../../../config/constants/styles';

type ComponentStyles = {
  commerceName: TextStyle;
  ratingWrapper: ViewStyle;
  commentContainer: ViewStyle;
  commentTime: TextStyle;
  commentText: TextStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  commerceName: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.normal,
    color: Colors.dark,
    marginBottom: 10,
  },
  ratingWrapper: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  commentContainer: {
    padding: 10,
    marginBottom: 4,
    backgroundColor: Colors.white,
  },
  commentTime:{
    alignSelf: 'flex-end',
    fontFamily: Fonts.Medium,
    fontSize: FontSizes.smaller,
    color: Colors.dark,
  },
  commentText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.normal,
    color: Colors.blue,
  },
});
