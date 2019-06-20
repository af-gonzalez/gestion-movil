import * as React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

export class AuthLoadingScreen extends React.Component<NavigationInjectedProps> {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const { navigate } = this.props.navigation;
    const sessionUser: SessionUser = JSON.parse(await AsyncStorage.getItem('sessionUser'));
    if (!sessionUser) {
      navigate('AuthModule');
    } else {
      const isCustomer = sessionUser.user.roles.some(({ name }) => name === 'CUSTOMER');
      const isTechnician = sessionUser.user.roles.some(({ name }) => name === 'TECHNICIAN');
      navigate(
        isCustomer && 'CommerceModule' || isTechnician && 'TechnicianModule' || 'AuthModule',
      );
    }

  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
