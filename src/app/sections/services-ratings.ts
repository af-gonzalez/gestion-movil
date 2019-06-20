import { createStackNavigator } from 'react-navigation';
import { PendingGradesScreen } from '@screens/services-ratings';

export const ServicesRatingsSection = createStackNavigator(
  {
    PendingGrades: { screen: PendingGradesScreen },
  },
  {
    initialRouteName: 'PendingGrades',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  },
);
