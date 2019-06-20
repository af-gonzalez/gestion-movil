import * as React from 'react';
import { connect, MapStateToProps, Provider } from 'react-redux';
import { Dimensions, StyleSheet, View, ViewStyle, AsyncStorage } from 'react-native';
import { MainModule } from './src/app/modules/main.module';
import { withFonts } from './src/config/preload';
import { store } from './src/config/store';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { NavigationState } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { ApolloClient, InMemoryCache, HttpLink, from, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { config } from './config';

const { width, height } = Dimensions.get('window');
console.ignoredYellowBox = ['[GraphQL error]: Message'];

type ComponentStyles = {
  mainContainer: ViewStyle;
};

const styles = StyleSheet.create<ComponentStyles>({
  mainContainer: {
    width,
    height,
  },
});

const ReduxifiedNavigator = reduxifyNavigator(MainModule as any, 'root');
const mapStateToProps: MapStateToProps<{ state: NavigationState }, {}, ReduxStore> =
  ({ nav }) => ({ state: nav });

const AppWithNavigationState = connect(mapStateToProps)(ReduxifiedNavigator as any);

const httpLink = new HttpLink({ uri: `http://${config.address}:${config.port}` });
const wsLink = new WebSocketLink({
  uri: `http://${config.address}:${config.port}/subscriptions`,
  options: {
    reconnect: true, connectionParams: async () => {
      const sessionUser: SessionUser = JSON.parse(await AsyncStorage.getItem('sessionUser'));
      return { authorization: sessionUser ? sessionUser.jwtToken : null };
    },
  },
});

const authMiddleware = setContext(async (operation) => {
  const sessionUser: SessionUser = JSON.parse(await AsyncStorage.getItem('sessionUser'));

  return {
    headers: {
      authorization: sessionUser ? sessionUser.jwtToken : null,
    },
  };
});

const client = new ApolloClient({
  link: from([authMiddleware, split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  )]),
  cache: new InMemoryCache(),
});

@withFonts
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <AppWithNavigationState />
          </Provider>
        </ApolloProvider>
      </View>
    );
  }
}
