import * as React from 'react';
import { Container, Content, Header } from '@components/layout';
import { View, FlatList, Text } from 'react-native';
import { Colors, Icons } from '@constants/styles';
import { Button, ConfirmationMessageModal } from '@components/commons';
import { NavigationInjectedProps } from 'react-navigation';
import { CurrentChatCard } from './current-chat-card';
import { ExpiredChatCard } from './expired-chat-card';
import { CreateChatCard } from './create-chat-card';
import { UserChatsQuery } from '@graphql/queries';
import { CreatChatMutation } from '@graphql/mutations';
import { styles } from './historic-chats.styles';

type ComponentState = {
  showLoadingChatModal: boolean;
};

type ComponentProps = NavigationInjectedProps;

export class HistoricChatsScreen extends React.Component<ComponentProps, ComponentState> {

  constructor(props) {
    super(props);

    this.state = {
      showLoadingChatModal: false,
    };

    this.openLoadingChatModal = this.openLoadingChatModal.bind(this);
    this.closeLoadingChatModal = this.closeLoadingChatModal.bind(this);
    this.renderUserChats = this.renderUserChats.bind(this);
  }

  openLoadingChatModal() {
    this.setState({ showLoadingChatModal: true });
  }

  closeLoadingChatModal() {
    this.setState({ showLoadingChatModal: false });
  }

  renderUserChats(userChats: UserChats) {
    const { currentChat, expiredChats } = userChats;
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.sectionTitle}>Chat Activo:</Text>
          {currentChat ? <CurrentChatCard currentChat={currentChat} /> :
            <CreateChatCard onPress={this.openLoadingChatModal} />}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Chats finalizados:</Text>
          <FlatList
            data={expiredChats}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <ExpiredChatCard expiredChat={item} />}
          />
        </View>
      </View>
    );
  }

  render() {

    return (
      <Container>
        <Header title="Chat en linea" mainView />
        <Content style={{ padding: 10 }}>
          <UserChatsQuery>
            {this.renderUserChats}
          </UserChatsQuery>
        </Content>
        <CreatChatMutation
          onSuccess={this.closeLoadingChatModal}
        >
          {createChat => (
            <ConfirmationMessageModal
              visible={this.state.showLoadingChatModal}
              message="¿Desea iniciar una conversación con la mesa de ayuda?"
              onConfirm={createChat}
              onCancel={this.closeLoadingChatModal} />
          )}
        </CreatChatMutation>
      </Container>
    );
  }
}
