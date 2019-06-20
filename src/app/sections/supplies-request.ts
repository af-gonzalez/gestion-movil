import { createStackNavigator } from 'react-navigation';
import { SuppliesListScreen } from '@screens/supplies-request';

export const SuppliestRequestSection = createStackNavigator(
  {
    SuppliesList: { screen: SuppliesListScreen },
  },
  {
    initialRouteName: 'SuppliesList',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  },
);
