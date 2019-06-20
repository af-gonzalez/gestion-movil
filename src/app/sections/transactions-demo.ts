import { createStackNavigator } from 'react-navigation';
import { DemoDetailsScreen, DemosListScreen } from '@screens/transactions-demo';

export const TransactionsDemoSection = createStackNavigator(
  {
    DemosList: { screen: DemosListScreen },
    DemoDetails: { screen: DemoDetailsScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'DemosList',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  },
);
