import * as React from 'react';
import { withMutation } from 'react-apollo';
import gql from 'graphql-tag';

const sendChatMessage = gql`
  mutation addChatMessage($chatId: String!, $message: String!){
    addChatMessage(chatId: $chatId, message: $message){
      message
      success
    }
  }
`;

interface ComponentProps {
  onSuccess?: Function;
  chatId: string;

  children(sendChatMessage: Function): React.ReactElement<{}>;
}

export const SendChatMessage: React.ComponentType<ComponentProps> =
  withMutation<ComponentProps>(sendChatMessage)(({ mutate, children, chatId, onSuccess }) => {
    return children((message: string) => {
      mutate({ variables: { chatId, message } })
        .then(() => onSuccess());
    });
  });
