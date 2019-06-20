import { Reducer, combineReducers, AnyAction } from 'redux';
import Polyline from '@mapbox/polyline';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';

enum ScheduleActions {
  addItem = '@@schedule/addRouteItem',
  removeItem = '@@schedule/removeRouteItem',
  replaceItems = '@@schedule/replaceRouteItems',
  setPolylineCoordinates = '@@schedule/setPolylineCoordinates',
  initService = '@@schedule/initService',
  finishService = '@@schedule/finishService',
}

export const addOptimalRouteItem = (item: GeoLocationItem): AnyAction => ({
  type: ScheduleActions.addItem,
  payload: item,
});

export const removeOptimalRouteITem = (itemId: number): AnyAction => ({
  type: ScheduleActions.removeItem,
  payload: itemId,
});

export const replaceOptimalRouteItems = (items: GeoLocationItem[]): AnyAction => ({
  type: ScheduleActions.replaceItems,
  payload: items,
});

const optimalRouteItems: Reducer<OptimalRouteItems> =
  (state = [], action) => {
    switch (action.type) {
      case ScheduleActions.addItem:
        return [...state, action.payload];
      case ScheduleActions.removeItem:
        const index = state.findIndex(({ id }) => id === action.payload);
        state.splice(index, 1);
        return [...state];
      case ScheduleActions.replaceItems:
        return [...action.payload];
      default:
        return state;
    }
  };

const pendingServices: Reducer<ScheduledService[]> = (state = [], action) => {
  switch (action.type) {
    case ScheduleActions.initService:
      const index = state.findIndex(service => service.id === action.payload.id);
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
};

export const setPolyLineCoordinates =
  () => async (dispatch, getState: () => ReduxStore) => {
    const { schedule: { userLocation, optimalRouteItems } } = getState();
    const distanceApiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    const directionsApiUrl = 'https://maps.googleapis.com/maps/api/directions/json';
    const origin = `${userLocation.latitude},${userLocation.longitude}`;
    const destinations = optimalRouteItems
      .map(({ coordinates }) => `${coordinates.latitude},${coordinates.longitude}`)
      .join('|');

    const request = `${distanceApiUrl}?origins=${origin}&destinations=${destinations}&key=AIzaSyCAyWq7WYJ-F2sj3EFrK8ZGR7a_WFI6kns`;
    const distancesResponse = await axios.get(request);
    const distances = optimalRouteItems.map((item, index) => ({
      coordinates: item.coordinates,
      distance: distancesResponse.data.rows[0].elements[index].distance.value,
    })).sort((a, b) => a.distance > b.distance ? 0 : -1);

    const { coordinates } = distances.pop();
    const destination = `${coordinates.latitude},${coordinates.longitude}`;
    const waypoints = distances
      .map(({ coordinates }) => `${coordinates.latitude},${coordinates.longitude}`)
      .join('|');

    const directionsRequest = `${directionsApiUrl}?origin=${origin}&destination=${destination}&waypoints=optimize:true|${waypoints}&key=AIzaSyCAyWq7WYJ-F2sj3EFrK8ZGR7a_WFI6kns`;
    const directionsResponse = await axios.get(directionsRequest);
    const points = Polyline.decode(directionsResponse.data.routes[0].overview_polyline.points);
    const routeCoordinates = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
    dispatch({ type: ScheduleActions.setPolylineCoordinates, payload: routeCoordinates });
    dispatch({ type: NavigationActions.NAVIGATE, routeName: 'OptimalRoute' });
  };

const polyLineCoordinates: Reducer<MapCoordinates[]> = (state = [], action) => {
  switch (action.type) {
    case ScheduleActions.setPolylineCoordinates:
      return action.payload;
    default:
      return state;
  }
};

const userLocation: Reducer<MapCoordinates> = (state = { latitude: 0, longitude: 0 }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const initService = (serviceId: number) => (dispatch, getState: () => ReduxStore) => {
  const { schedule: { pendingServices } } = getState();
  const serviceIndex = pendingServices.findIndex(service => serviceId === service.id);
  dispatch({ type: ScheduleActions.initService, payload: { ...pendingServices[serviceIndex] } });
  dispatch({ type: NavigationActions.NAVIGATE, routeName: 'ServicesList' });
};

export const finishService = () => (dispatch) => {
  dispatch({ type: ScheduleActions.finishService });
  dispatch({ type: NavigationActions.NAVIGATE, routeName: 'ServicesList' });
};

const activeService: Reducer<ScheduledService> = (state = null, action) => {
  switch (action.type) {
    case ScheduleActions.initService:
      return action.payload;
    case ScheduleActions.finishService:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  optimalRouteItems,
  pendingServices,
  polyLineCoordinates,
  userLocation,
  activeService,
});
