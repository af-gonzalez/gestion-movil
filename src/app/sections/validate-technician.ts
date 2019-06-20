import { createStackNavigator } from 'react-navigation';
import { ValidateFormScreen } from '@screens/validate-technician';

export const ValidateTechnicianSection = createStackNavigator(
  {
    ValidateTechnicianForm: { screen: ValidateFormScreen },
  },
  {
    initialRouteName: 'ValidateTechnicianForm',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  },
);
