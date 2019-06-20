import * as React from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { Container, Content, Footer, Header } from '@components/layout';
import { styles } from './chat-view.styles';
import { Button, InputText } from '@components/commons';
import { Colors, FontSizes, Icons } from '@constants/styles';
import { NavigationInjectedProps } from 'react-navigation';
import { ChatMessagesQuery } from '@graphql/queries';
import { UserMessage } from '@screens/chat/chat-view/user-message';
import { ServiceDeskMesage } from '@screens/chat/chat-view/service-desk-message';
import { SendChatMessage } from '@graphql/mutations/send-chat-message.mutation';

console.log(Dimensions.get('window'));

type ComponentState = {
  message: string;
};

interface ComponentProps extends NavigationInjectedProps {
}

export class ChatViewScreen extends React.PureComponent<ComponentProps, ComponentState> {
  scrolledView = React.createRef<ScrollView>();
  state: ComponentState = {
    message: '',
  };

  constructor(props) {
    super(props);

    this.renderChatMessages = this.renderChatMessages.bind(this);
  }


  handleMessageChange = (message: string) => {
    this.setState({ message });
  }

  handleSendButtonAction = () => {
    this.setState({ message: '' });
  }

  scrollViewToEnd = () => {
    this.scrolledView.current.scrollToEnd({ animated: false });
  }

  componentWillUnmount(): void {
    console.log('unmount');
  }

  renderChatMessages(chatMessages: ChatMessage[]) {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId', null);

    return (
      <ScrollView
        ref={this.scrolledView}
        onLayout={this.scrollViewToEnd}
        onContentSizeChange={this.scrollViewToEnd}
      >
        {
          chatMessages.map(message =>
            message.sender.id === userId ? (
              <UserMessage
                key={message.id}
                avatarUrl={message.sender.profileImage}
                messageContent={message.content}
                createdAt={message.createdAt}
              />
            ) : (
              <ServiceDeskMesage
                key={message.id}
                avatarUrl={message.sender.profileImage}
                messageContent={message.content}
                createdAt={message.createdAt}
                userName={message.sender.name}
              />
            ))
        }
      </ScrollView>
    );
  }

  render() {
    console.log('render chat view');

    const { navigation } = this.props;
    const chatId = navigation.getParam('chatId', null);

    return (
      <Container>
        <Header title="Chat en linea" />
        <Content style={styles.container}>
          <ChatMessagesQuery chatId={chatId}>
            {this.renderChatMessages}
          </ChatMessagesQuery>
        </Content>
        <View style={styles.messageInputBox}>
          <View style={styles.inputSection}>
            <InputText
              placeholder="Nuevo mensaje"
              value={this.state.message}
              onChange={this.handleMessageChange}
              expandable
              autoCorrect
              boxStyle={{ marginBottom: 0 }}
            />
          </View>
          <View style={styles.buttonSection}>
            <SendChatMessage
              chatId={chatId}
              onSuccess={this.handleSendButtonAction}
            >
              {sendMessage => (
                <Button
                  text="Enviar"
                  icon={Icons.mailSend}
                  iconSize={20}
                  fontSize={FontSizes.small}
                  height={40}
                  disabled={this.state.message === ''}
                  backgroundColor={this.state.message === '' ? Colors.gray : Colors.dark}
                  onPress={() => sendMessage(this.state.message)}
                />
              )}
            </SendChatMessage>
          </View>
        </View>
      </Container>
    );
  }
}
