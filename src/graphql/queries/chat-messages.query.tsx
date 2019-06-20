import * as React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { Loading } from '@components/commons';

const chatMessagesQuery = gql`
  query chatMessages($chatId: String!){
    chatMessages(chatId: $chatId){
      id
      createdAt
      content
      sender{
        id
        name
        profileImage
      }
    }
  }
`;

const chatMessageSub = gql`
  subscription chatMessageSub($chatId: String!) {
    chatMessage:chatMessageSubscription(chatId: $chatId) {
      id
      createdAt
      content
      sender {
        id
        name
        profileImage
      }
    }
  }
`;

interface ComponentProps {
  chatId: string;

  children(chatMessages: ChatMessage[]): React.ReactNode;
}

export class ChatMessagesQuery extends React.PureComponent<ComponentProps> {
  unsubscribeToMessages: Function;

  render(): React.ReactNode {
    const { chatId, children } = this.props;

    return (
      <Query
        query={chatMessagesQuery}
        variables={{ chatId }}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading, subscribeToMore }: QueryResult<{ chatMessages: ChatMessage[] }>) => {
          if (loading) return <Loading />;

          if (this.unsubscribeToMessages) this.unsubscribeToMessages();

          this.unsubscribeToMessages = subscribeToMore<{ chatMessage: ChatMessage }>({
            document: chatMessageSub,
            variables: { chatId },
            updateQuery(prev, { subscriptionData: { data: { chatMessage } } }) {
              console.log('chatMessage');
              return { ...prev, chatMessages: [...prev.chatMessages, chatMessage] };
            },
          });

          return children(data.chatMessages);
        }}
      </Query>
    );
  }
}
