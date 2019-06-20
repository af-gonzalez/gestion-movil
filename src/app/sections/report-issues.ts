import { createStackNavigator } from 'react-navigation';
import {
  DeviceSelectionScreen,
  DeviceDetailsScreen,
  ReportFormScreen,
} from '@screens/report-issues';

export const ReportIssuesSection = createStackNavigator(
  {
    DeviceSelection: { screen: DeviceSelectionScreen },
    DeviceDetailsScreen: { screen: DeviceDetailsScreen },
    ReportFormScreen: { screen: ReportFormScreen },
  },
  {
    initialRouteName: 'DeviceSelection',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  },
);
