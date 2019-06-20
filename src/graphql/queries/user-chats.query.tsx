import * as React from 'react';
import { QueryResult, Query } from 'react-apollo';
import { Loading } from '@components/commons';
import gql from 'graphql-tag';

const userChatsQuery = gql`
  query userChats{
    userChats{
      currentChat{
        id
        active
        user{
          id
        }
        supportUser{
          name
          lastname
          profileImage
        }
      }
      expiredChats{
        id
        createdAt
        expiredAt
        supportUser{
         fullname
         profileImage
        }
      }
    }
  }
`;

const chatActivatedSubscription = gql`
  subscription chatActivated{
    activatedChat:chatInitializedSubscription{
      id
      active
      supportUser{
          name
          lastname
          profileImage
        }
    }
  }
`;

const chatCreatedSubcription = gql`
  subscription {
    createdChat: userChatCreated {
      id
      active
      user{
        id
      }
      supportUser {
        name
        lastname
        profileImage
      }
    }
  }
`;

const chatExpiredSubscription = gql`
  subscription {
    expiredChat: chatExpired {
      id
      createdAt
      expiredAt
      supportUser{
       fullname
       profileImage
      }
    }
  }
`;

type ComponentProps = {
  children(userChats: UserChats): React.ReactNode;
};

export class UserChatsQuery extends React.PureComponent<ComponentProps> {
  unsubscribeFromChatCreation: Function;
  unsubscribeFromChatActivation: Function;
  unsubscribeFromChatExpiration: Function;

  render(): React.ReactNode {
    const { children } = this.props;
    return (
      <Query query={userChatsQuery} fetchPolicy="network-only">
        {({ loading, data, subscribeToMore }: QueryResult<{ userChats: UserChats }>) => {

          if (loading) return <Loading />;

          const { currentChat } = data.userChats;

          if (currentChat) {
            if (currentChat.active) {
              if (this.unsubscribeFromChatExpiration) this.unsubscribeFromChatExpiration();
              this.unsubscribeFromChatExpiration = subscribeToMore<{ expiredChat: Chat }>({
                document: chatExpiredSubscription,
                updateQuery(prev, { subscriptionData: { data: { expiredChat } } }) {
                  const { currentChat } = prev.userChats;
                  return currentChat.id === expiredChat.id ? {
                    ...prev,
                    userChats: {
                      ...prev.userChats,
                      currentChat: null,
                      expiredChats: [expiredChat, ...prev.userChats.expiredChats],
                    },
                  } : prev;
                },
              });
            } else {

              if (this.unsubscribeFromChatActivation) this.unsubscribeFromChatActivation();
              this.unsubscribeFromChatActivation = subscribeToMore<{ activatedChat: Chat }>({
                document: chatActivatedSubscription,
                updateQuery(prev, { subscriptionData: { data: { activatedChat } } }) {
                  const { currentChat } = prev.userChats;
                  return currentChat && currentChat.id === activatedChat.id ? {
                    ...prev,
                    userChats: {
                      ...prev.userChats,
                      currentChat: { ...currentChat, active: true },
                    },
                  } : prev;
                },
              });
            }
          } else {
            if (this.unsubscribeFromChatCreation) this.unsubscribeFromChatCreation();
            this.unsubscribeFromChatCreation = subscribeToMore<{ createdChat: Chat }>({
              document: chatCreatedSubcription,
              updateQuery(prev, { subscriptionData: { data } }) {
                return {
                  ...prev,
                  userChats: {
                    ...prev.userChats,
                    currentChat: data.createdChat,
                  },
                };
              },
            });
          }

          return children(data.userChats);
        }}
      </Query>
    );
  }
}
