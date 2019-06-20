import { createStackNavigator } from 'react-navigation';
import { CustomerInfoFormScreen } from '@screens/edit-customer-info';
import { Colors } from '@constants/styles';

export const CustomerInfoSection = createStackNavigator(
  {
    CustomerInfoForm: { screen: CustomerInfoFormScreen },
  },
  {
    initialRouteName: 'CustomerInfoForm',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
    cardStyle: {
      backgroundColor: Colors.lightGray,
    },
  },
);
