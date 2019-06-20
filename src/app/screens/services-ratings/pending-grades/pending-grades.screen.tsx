import * as React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Header } from '@components/layout';

export class PendingGradesScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header title="Calificar Servicio" mainView/>
        <Content>
          <View>
            <Text>
             Calificar Servicio
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}
