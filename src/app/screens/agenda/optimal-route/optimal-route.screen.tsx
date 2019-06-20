import * as React from 'react';
// @ts-ignore
import { MapView } from 'expo';
import { TouchableOpacity, View } from 'react-native';
import { Colors, Icons } from '../../../../config/constants/styles';
import { Container, Header } from '@components/layout';
import { MaterialIcon } from '@components/commons';
import { connect, MapStateToProps } from 'react-redux';

import { styles } from './optimal-route.styles';

type PropsFromState = {
  optimalRouteItems: OptimalRouteItems;
  userLocation: MapCoordinates;
  polyLineCoordinates: MapCoordinates[];
};

type ComponentState = {
  routeCoordinates: MapCoordinates[];
};

const mapStateToProps: MapStateToProps<PropsFromState, {}, ReduxStore> =
  ({ schedule: { optimalRouteItems, userLocation, polyLineCoordinates } }) =>
    ({ optimalRouteItems, userLocation, polyLineCoordinates });

// @ts-ignore
@connect(mapStateToProps)
export class OptimalRouteScreen extends React.Component<PropsFromState, ComponentState> {
  mapInstance = React.createRef<any>();
  state: ComponentState = {
    routeCoordinates: [],
  };

  handleResetMapRegionAction = () => {
    const { optimalRouteItems, userLocation } = this.props;
    let minX;
    let maxX;
    let minY;
    let maxY;

    minX = userLocation.latitude;
    maxX = userLocation.latitude;
    minY = userLocation.longitude;
    maxY = userLocation.longitude;

    for (const { coordinates: { latitude, longitude } } of optimalRouteItems) {
      minX = Math.min(minX, latitude);
      maxX = Math.max(maxX, latitude);
      minY = Math.min(minY, longitude);
      maxY = Math.max(maxY, longitude);
    }

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    this.mapInstance.current.animateToRegion({
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX * 1.2,
      longitudeDelta: deltaY * 1.2,
    });
  }

  render() {
    const { optimalRouteItems, userLocation } = this.props;
    let minX;
    let maxX;
    let minY;
    let maxY;

    minX = userLocation.latitude;
    maxX = userLocation.latitude;
    minY = userLocation.longitude;
    maxY = userLocation.longitude;

    for (const { coordinates: { latitude, longitude } } of optimalRouteItems) {
      minX = Math.min(minX, latitude);
      maxX = Math.max(maxX, latitude);
      minY = Math.min(minY, longitude);
      maxY = Math.max(maxY, longitude);
    }

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const midPoint = [midX, midY];

    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    console.log(deltaX, deltaY);


    return (
      <Container>
        <Header title="Ruta Optima" />
        <View style={styles.mapContainer}>
          <MapView
            style={{ flex: 1 }}
            provider={MapView.PROVIDER_GOOGLE}
            ref={this.mapInstance}
            initialRegion={{
              latitude: midX,
              longitude: midY,
              latitudeDelta: deltaX * 1.2,
              longitudeDelta: deltaY * 1.2,
            }}
          >
            <MapView.Marker coordinate={{
              latitude: this.props.userLocation.latitude,
              longitude: this.props.userLocation.longitude,
            }} style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <MaterialIcon name={Icons.pin} size={24} color={Colors.red} />
            </MapView.Marker>

            {
              this.props.optimalRouteItems.map(({ id, coordinates: { latitude, longitude } }) => (
                <MapView.Marker coordinate={{ latitude, longitude }} key={id} style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <MaterialIcon name={Icons.dotCircle} size={24} color={Colors.red} />
                </MapView.Marker>
              ))
            }

            <MapView.Polyline
              coordinates={this.props.polyLineCoordinates}
              strokeWidth={3}
              lineCap="square"
              strokeColor={Colors.gray} />

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
      </Container>
    );
  }
}

// 0.13795309999999983 0.0992743000000047
