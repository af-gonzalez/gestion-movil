import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../../../config/constants/styles';

type ComponentStyles = {
  mapContainer: ViewStyle;
  map: ViewStyle;
  resetMapRegionButton: ViewStyle;
};

export const styles = StyleSheet.create<ComponentStyles>({
  mapContainer: {
    position: 'relative',
  },
  map: {
    alignSelf: 'stretch',
    height: 210,
  },
  resetMapRegionButton: {
    width: 30,
    height: 30,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.darkGray,
    shadowRadius: 2,
    shadowOpacity: 0.7,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
});
