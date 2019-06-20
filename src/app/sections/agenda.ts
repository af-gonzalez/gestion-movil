import { createStackNavigator } from 'react-navigation';

import {
  CustomerRatingsScreen,
  FinishServiceScreen,
  InitServiceScreen,
  OptimalRouteScreen,
  ScheduledServicesScreen,
} from '@screens/agenda';

import { ChatViewScreen } from '@screens/chat';

export const AgendaSection = createStackNavigator(
  {
    ServicesList: { screen: ScheduledServicesScreen },
    OptimalRoute: { screen: OptimalRouteScreen },
    InitService: { screen: InitServiceScreen },
    FinishService: { screen: FinishServiceScreen },
    CustomerRatings: { screen: CustomerRatingsScreen },
    ChatView: { screen: ChatViewScreen },
  },
  {
    initialRouteName: 'ServicesList',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  },
);
