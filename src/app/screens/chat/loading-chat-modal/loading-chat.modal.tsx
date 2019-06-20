import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { MaterialIcon, Modal } from '@components/commons';
import { loadingChatStyles } from './loading-chat.styles';
import { Colors, Icons } from '@constants/styles';
import { NavigationScreenProp, NavigationState, withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import { Mutation, Subscription } from 'react-apollo';

const createChatMutation = gql`
  mutation{
    chat:createChat{
      id
    }
  }
`;

const chatInitialized = gql`
  subscription chatInitializedSubscription($chatId: String!){
    chatInitializedSubscription(chatId: $chatId){
      id
      active
    }
  }
`;

type ComponentProps = {
  visible: boolean;
  onCancel: () => void;
  navigation?: NavigationScreenProp<NavigationState, {}>;
};

type ComponentState = {
  loadingChat: boolean;
  chatId: string;
};

// @ts-ignore
@withNavigation
export class LoadingChatModal extends React.PureComponent<ComponentProps, ComponentState> {
  modal = React.createRef<any>();
  loadingIconRotation = new Animated.Value(0);
  state: ComponentState = {
    loadingChat: false,
    chatId: null,
  };

  constructor(props) {
    super(props);

    this.handleChatCreated = this.handleChatCreated.bind(this);
  }

  handleConfirmNewChat = async (createChat: Function) => {
    Animated.loop(Animated.timing(this.loadingIconRotation, {
      toValue: 1,
      duration: 2000,
    })).start();

    this.setState({ loadingChat: true });
    createChat();
  }

  async handleChatCreated(response: any) {
    //await this.modal.current.getWrappedInstance().closeModal();
    //this.props.navigation.navigate('ChatView', { chatId: response.chat.id });
  }

  closeModal = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.loadingIconRotation.setValue(0);
    this.setState({ loadingChat: false });
    this.props.onCancel();
  }

  render() {
    const rotation = this.loadingIconRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Mutation
        mutation={createChatMutation}
        onCompleted={this.handleChatCreated}
      >
        {(createChat, { loading, data }) => {
          console.log('DATAAA', data);
          return (
            <Modal
              visible={this.props.visible}
              successAction={() => this.handleConfirmNewChat(createChat)}
              hideSuccessAction={this.state.loadingChat}
              cancelAction={this.closeModal}
              cancelText="Cancelar"
              successText="Confirmar"
              ref={this.modal}
            >
              <View style={loadingChatStyles.modalContent}>
                {this.state.loadingChat ? (
                  <Subscription
                    subscription={chatInitialized}
                    variables={{ chatId: data ? data.chat.id : '' }}
                    onSubscriptionData={data => console.log(data)}
                  >
                    {() => (
                      <React.Fragment>
                        <Text style={loadingChatStyles.title}>
                          Iniciando nuevo chat
                        </Text>
                        <Text style={loadingChatStyles.text}>
                          En unos momentos uno de nuestros agentes le atendera.
                        </Text>
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                          <MaterialIcon name={Icons.refresh} color={Colors.blue} size={70} />
                        </Animated.View>
                      </React.Fragment>
                    )}
                  </Subscription>
                ) : (
                  <React.Fragment>
                    <Text style={loadingChatStyles.title}>
                      ¿Desea iniciar una conversación con la mesa de ayuda?
                    </Text>
                  </React.Fragment>
                )}
              </View>
            </Modal>
          );
        }}
      </Mutation>
    );
  }
}
