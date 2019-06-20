import { AnyAction, combineReducers, Reducer } from 'redux';
import { NavigationActions } from 'react-navigation';

enum ChatActions {
  createChat = '@@chat/createChat',
  updateMessages = '@@chat/updateMessages',
  closeChat = '@@chat/closeChat',
  setHistoricChats = '@@chat/getHistoricChats',
}

export const createChat = (chat) => async (dispatch) => {
  const { userId, helpDeskUserId } = chat.data();
  const activeChat: Chat = {
    id: chat.id,
    user: {
      id: userId,
      name: 'Andres Gonzalez',
      avatarImage: userImageURL,
    },
    helpDeskUser: {
      id: helpDeskUserId,
      name: 'Katherin Urrego',
      avatarImage: helpDeskUserImageURL,
    },
    messages: [],
  };

  dispatch({ type: ChatActions.createChat, payload: activeChat });
  dispatch({ type: NavigationActions.NAVIGATE, routeName: 'ChatView' });
};

export const closeChat = (): AnyAction => ({
  type: ChatActions.closeChat,
});

export const setActiveChat = (activeChat: Chat) => (dispatch) => {
  dispatch({ type: ChatActions.createChat, payload: activeChat });
  dispatch({ type: NavigationActions.NAVIGATE, routeName: 'ChatView' });
};

export const sendMessage = (chatId: string, messageContent: string) => {
  return async (dispatch, getState: () => ReduxStore) => {
    const chat = await firebase.firestore()
      .collection('chats')
      .doc(chatId)
      .get();

    const message = {
      sender: 'Netcom2',
      content: messageContent,
      createdAt: Date.now(),
    };

    await chat.ref.collection('messages').add(message);
  };
};

const activeChat: Reducer<Chat> = (state = null, action) => {
  switch (action.type) {
    case ChatActions.createChat:
      return action.payload;
    case ChatActions.updateMessages:
      return { ...state, messages: action.payload };
    case ChatActions.closeChat:
      return null;
    default:
      return state;
  }
};

export const setHistoricChats = (chats: Chat[]) => ({
  type: ChatActions.setHistoricChats,
  payload: chats,
});

const historicChats: Reducer<Chat[]> = (state = [], action) => {
  switch (action.type) {
    case ChatActions.setHistoricChats:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  activeChat,
  historicChats,
});
