import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

interface ComponentProps {
  children: (createChat: () => void) => React.ReactNode;
  onSuccess: () => void;
}

const createChatMutation = gql`
  mutation createChat {
    createChat {
      id
    }
  }
`;

export const CreatChatMutation: React.FC<ComponentProps> = ({ children, onSuccess }) => {
  return (
    <Mutation mutation={createChatMutation}>
      {(createChat) => children(() => createChat().then((a) => {
        onSuccess();
      }))}
    </Mutation>
  );
};
