import { createStackNavigator } from 'react-navigation';
import { ReportsListScreen, ExecutiveReportScreen } from '@screens/transactional-info';

export const TransactionalInfoSection = createStackNavigator(
  {
    Reportslist: { screen: ReportsListScreen },
    ExecutiveReport: { screen: ExecutiveReportScreen },
  },
  {
    initialRouteName: 'Reportslist',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  },
);
