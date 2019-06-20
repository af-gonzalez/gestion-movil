import * as React from 'react';
import { createDrawerNavigator, NavigationInjectedProps, NavigationRouter } from 'react-navigation';

import { ChatSection } from '../../sections/chat';
import { CustomerInfoSection } from '../../sections/customer-info';
import { ReportIssuesSection } from '../../sections/report-issues';
import { SuppliestRequestSection } from '../../sections/supplies-request';
import { TransactionalInfoSection } from '../../sections/transactional-info';
import { ValidateTechnicianSection } from '../../sections/validate-technician';
import { TransactionsDemoSection } from '../../sections/transactions-demo';

import { ConfirmationMessageModal, MaterialIcon } from '../../components/commons';
import { DrawerMenu } from '../../components/layout';
import { Colors, Fonts, Icons } from '../../../config/constants/styles';
import { Notifications, Permissions } from 'expo';
import { EventSubscription } from 'fbemitter';
import { View, AsyncStorage } from 'react-native';
import { ServiceToQualifyModal } from '../../screens/report-issues/service-to-qualify';
import { NewChatMessageModal } from './new-chat-message';

import { MutateProps, MutationProps, withMutation } from 'react-apollo';
import gql from 'graphql-tag';

const routeConfigMap = {
  // TransactionsDemoSection: {
  //   screen: TransactionsDemoSection,
  //   navigationOptions: {
  //     drawerLabel: 'Demo Transacciones',
  //     drawerIcon: ({ tintColor }) => (
  //       <MaterialIcon name={Icons.tvPlay} color={tintColor} />
  //     ),
  //   },
  // },
  // ReportIssuesSection: {
  //   screen: ReportIssuesSection,
  //   navigationOptions: {
  //     drawerLabel: 'Reporte Solicitud',
  //     drawerIcon: ({ tintColor }) => (
  //       <MaterialIcon name={Icons.wrench} color={tintColor} />
  //     ),
  //   },
  // },
  ChatSection: {
    screen: ChatSection,
    navigationOptions: {
      drawerLabel: 'Chat en Linea',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcon name={Icons.commentTextAlt} color={tintColor} />
      ),
    },
  },
  // TransactionalInfoSection: {
  //   screen: TransactionalInfoSection,
  //   navigationOptions: {
  //     drawerLabel: 'Información Transaccional',
  //     drawerIcon: ({ tintColor }) => (
  //       <MaterialIcon name={Icons.calendarAlt} color={tintColor} />
  //     ),
  //   },
  // },
  ValidateTechnicianSection: {
    screen: ValidateTechnicianSection,
    navigationOptions: {
      drawerLabel: 'Validar Tecnico',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcon name={Icons.assignmentAccount} color={tintColor} />
      ),
    },
  },
  SuppliesRequestSection: {
    screen: SuppliestRequestSection,
    navigationOptions: {
      drawerLabel: 'Solicitud de Insumos',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcon name={Icons.archive} color={tintColor} />
      ),
    },
  },
  /*
  ServicesRatingsSection: {
    screen: ServicesRatingsSection,
    navigationOptions: {
      drawerLabel: 'Calificar Servicios',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcon name={Icons.star} color={tintColor} />
      ),
    },
  },
  */
  CustomerInfoSection: {
    screen: CustomerInfoSection,
    navigationOptions: {
      drawerLabel: 'Editar Información',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcon name={Icons.account} color={tintColor} />
      ),
    },
  },
};

const drawerConfig = {
  initialRouteName: 'ChatSection',
  contentComponent: DrawerMenu,
  contentOptions: {
    activeTintColor: Colors.blue,
    inactiveTintColor: Colors.darkGray,
    inactiveBackgroundColor: Colors.white,
    activeBackgroundColor: Colors.white,
    itemStyle: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.lightGray,
      height: 40,
      alignItems: 'center',
    },
    activeLabelStyle: {
      color: Colors.dark,
      fontFamily: Fonts.Medium,
    },
    labelStyle: {
      fontFamily: Fonts.Regular,
      fontSize: 15,
      height: 40,
      lineHeight: 40,
      marginLeft: 0,
      color: '#414141',
    },
    iconContainerStyle: {
      marginHorizontal: 10,
    },
  },
};

const CommerceModuleNavigator = createDrawerNavigator(routeConfigMap, drawerConfig);

type ComponentProps = NavigationInjectedProps & MutateProps;

type ComponentState = {
  showNewMessageModal: boolean;
  newMessage: {
    username: string,
    content: string,
    chatId: string,
    userId: string,
  };
};

const setUserDeviceToken = gql`
  mutation setUserDeviceToken($deviceToken: String!){
    setUserDeviceToken(deviceToken: $deviceToken){
      success
      message
    }
  }
`;

// @ts-ignore
@withMutation(setUserDeviceToken)
export class CommerceModule extends React.Component<ComponentProps, ComponentState> {
  notificationsListenerInstance: EventSubscription;
  unsubscribeToServicesToQualify: Function;
  static router: NavigationRouter;
  state: ComponentState = {
    showNewMessageModal: false,
    newMessage: null,
  };

  async componentDidMount() {
    await this.validateCameraRollPermission();
    await this.validateCameraPermission();

    this.notificationsListenerInstance = Notifications.addListener(this.notificationsListener);

    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      const expoToken = await Notifications.getExpoPushTokenAsync();
      const result = await this.props.mutate({
        variables: { deviceToken: expoToken },
      });

      console.log('RESULT', result);
    }
  }

  async validateCameraRollPermission() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      finalStatus = status;
    }

  }

  async validateCameraPermission() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.CAMERA);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      finalStatus = status;
    }

  }

  async componentWillUnmount() {
    this.notificationsListenerInstance.remove();
    //this.unsubscribeToServicesToQualify();
    const username = await AsyncStorage.getItem('username');
  }

  openNewMessageModal = () => this.setState({ showNewMessageModal: true });

  closeNewMessageModal = () => this.setState({ showNewMessageModal: false });

  handleOpenMessageAction = () => {
    this.closeNewMessageModal();
    const { chatId, userId } = this.state.newMessage;
    this.props.navigation.navigate('ChatView', { chatId, userId });
  }

  notificationsListener = async (notification: Notifications.Notification) => {
    if (notification.remote && notification.origin === 'selected') {
      if (notification.data.notificationType === 'newChatMessage') {
        const {
          content,
          supportUserName: username,
          customerUser: userId,
          chat: chatId,
        } = notification.data;

        this.props.navigation.navigate('ChatView', { chatId, userId });
      }
    }

    if (notification.remote && notification.origin === 'received') {
      if (notification.data.notificationType === 'newChatMessage') {
        const { index, routes } = this.props.navigation.state;
        const currentSection: any = { ...routes[index] };
        const { routeName } = currentSection.routes[currentSection.routes.length - 1];

        if (routeName !== 'ChatView') {
          const {
            content,
            supportUserName: username,
            customerUser: userId,
            chat: chatId,
          } = notification.data;

          this.setState({
            showNewMessageModal: true,
            newMessage: { username, content, userId, chatId },
          });
        }
      }
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CommerceModuleNavigator navigation={navigation} />
        {this.state.newMessage && (
          <NewChatMessageModal
            message={this.state.newMessage.content}
            supportUserName={this.state.newMessage.username}
            visible={this.state.showNewMessageModal}
            onConfirm={this.handleOpenMessageAction}
            onCancel={this.closeNewMessageModal}
          />)}
        <ServiceToQualifyModal />
      </View>
    );
  }
}

CommerceModule.router = CommerceModuleNavigator.router;
