import * as React from 'react';
import { Keyboard } from 'react-native';
import { createSwitchNavigator, NavigationInjectedProps, NavigationRouter } from 'react-navigation';
import { TechnicianModule } from './technician.module';
import { AuthModule } from './auth.module';
import { CommerceModule } from './commerce/commerce.module';
import { AuthLoadingScreen } from '@screens/auth-loading';
import { KeyboardStatus, setKeyboardStatus } from '@store/misc';
import { connect } from 'react-redux';

export const MainModuleNavigator = createSwitchNavigator(
  {
    AuthLoading: { screen: AuthLoadingScreen },
    TechnicianModule: { screen: TechnicianModule },
    AuthModule: { screen: AuthModule },
    CommerceModule: { screen: CommerceModule },
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

type PropsFromDispatch = {
  setKeyboardStatus?: typeof setKeyboardStatus;
};

type ComponentProps = PropsFromDispatch & Partial<NavigationInjectedProps>;

// @ts-ignore
@connect(null, { setKeyboardStatus })
export class MainModule extends React.Component<ComponentProps> {
  static router: NavigationRouter;
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  componentDidMount(): void {
    this.keyboardDidShowListener = Keyboard
      .addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideListener = Keyboard
      .addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount(): void {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleKeyboardDidShow = (event) => {
    this.props.setKeyboardStatus(KeyboardStatus.Opened, event.endCoordinates.height);
  }

  handleKeyboardDidHide = () => {
    this.props.setKeyboardStatus(KeyboardStatus.Closed);
  }

  render(): React.ReactNode {
    return (
      <MainModuleNavigator navigation={this.props.navigation} />
    );
  }
}

MainModule.router = MainModuleNavigator.router;
