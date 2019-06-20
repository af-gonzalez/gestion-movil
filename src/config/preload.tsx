import * as React from 'react';
import { Font, Asset, Permissions, Notifications } from 'expo';
import { Fonts } from '@constants/styles';

type ComponentState = {
  loadedFonts: boolean;
};

export const withFonts = (Component: React.ComponentType): any =>
  class extends React.Component<{}, ComponentState> {
    listener: any;
    state = {
      loadedFonts: false,
    };

    async componentDidMount() {
      await Font.loadAsync({
        Regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        Medium: require('../../assets/fonts/Montserrat-Medium.ttf'),
        [Fonts.Bold]: require('../../assets/fonts/Montserrat-Bold.ttf'),
        [Fonts.Light]: require('../../assets/fonts/Montserrat-Light.ttf'),
        [Fonts.ExtraLight]: require('../../assets/fonts/Montserrat-ExtraLight.ttf'),
        Material: require('../../assets/fonts/Material-Design-Iconic-Font.ttf'),
      });

      await Asset.fromModule(require('../../assets/bg.jpg')).downloadAsync();
      await Asset.fromModule(require('../../assets/netcomLogo.png')).downloadAsync();
      await Asset.fromModule(require('../../assets/redebanLogo.png')).downloadAsync();
      await Asset.fromModule(require('../../assets/girl.png')).downloadAsync();
      await Asset.fromModule(require('../../assets/girl2.jpg')).downloadAsync();
      await Asset.fromModule(require('../../assets/girl.jpg')).downloadAsync();
      await Asset.fromModule(require('../../assets/logo.png')).downloadAsync();

      await this.registerForPushNotifications();

      this.setState({ loadedFonts: true });
    }

    async registerForPushNotifications() {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (finalStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      if (finalStatus !== 'granted') return;
      const token = await Notifications.getExpoPushTokenAsync();
    }

    render() {
      const { loadedFonts } = this.state;
      return loadedFonts ? <Component /> : null;
    }
  };
