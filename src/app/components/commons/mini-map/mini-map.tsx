import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
// @ts-ignore
import { MapView } from 'expo';

import { Colors, Icons } from '../../../../config/constants/styles';
import { MaterialIcon } from '..';

import { styles } from './mini-map.styles';

type ComponentProps = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export class MiniMap extends React.PureComponent<ComponentProps> {
  mapInstance = React.createRef<any>();

  handleResetMapRegionAction = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.props;
    this.mapInstance.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
  }

  render() {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.props;

    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          ref={this.mapInstance}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        >
          <MapView.Marker coordinate={{ latitude, longitude }}>
            <MaterialIcon name={Icons.pin} size={30} color={Colors.red} />
          </MapView.Marker>
        </MapView>
        <TouchableOpacity
          onPress={this.handleResetMapRegionAction}
          style={[styles.resetMapRegionButton, { display: 'none'}]}
        >
          <MaterialIcon name={Icons.navigation} color={Colors.darkGray} size={18} style={{
            position: 'relative',
            bottom: 1,
            left: 1,
          }} />
        </TouchableOpacity>
      </View>
    );
  }
}

