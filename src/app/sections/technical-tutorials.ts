import { createStackNavigator } from 'react-navigation';
import { TutorialDetailsScreen, TutorialsListScreen } from '@screens/technical-tutorials';

export const TechnicalTutorialsSection = createStackNavigator(
  {
    TutorialsList: { screen: TutorialsListScreen },
    TutorialDetails: { screen: TutorialDetailsScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'TutorialsList',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  },
);
