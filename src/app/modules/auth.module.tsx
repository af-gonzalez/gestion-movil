import * as React from 'react';
import { createStackNavigator, NavigationInjectedProps, NavigationRouter } from 'react-navigation';
import {
  LoginFormScreen,
  TokenFormScreen,
  RestorePasswordScreen, LoginContainer,
} from '@screens/login';

import { Colors } from '../../config/constants/styles';

export const AuthModuleNavigator = createStackNavigator(
  {
    LoginForm: { screen: LoginFormScreen },
    TokenForm: { screen: TokenFormScreen },
    RestorePassForm: { screen: RestorePasswordScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginForm',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 200,
      },
    }),
    cardStyle: {
      backgroundColor: Colors.white,
    },
  },
);

type ComponentProps = NavigationInjectedProps;

export class AuthModule extends React.Component<ComponentProps> {
  static router: NavigationRouter;

  render(): React.ReactNode {
    return (
      <LoginContainer>
        <AuthModuleNavigator navigation={this.props.navigation} />
      </LoginContainer>
    );
  }
}

AuthModule.router = AuthModuleNavigator.router;
