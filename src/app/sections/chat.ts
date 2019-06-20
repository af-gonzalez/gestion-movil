import { createStackNavigator } from 'react-navigation';
import { HistoricChatsScreen, ChatViewScreen } from '@screens/chat';

export const ChatSection = createStackNavigator(
  {
    HistoricChats: { screen: HistoricChatsScreen },
    ChatView: { screen: ChatViewScreen },
  },
  {
    initialRouteName: 'HistoricChats',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),

  },
);
