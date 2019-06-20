import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { Container, Content, Footer, Header } from '@components/layout';

import { styles } from './demo-details.styles';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Button, MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../config/constants/styles';
import { MoreInfoModal } from '../more-info';

type ComponentProps = {
  navigation: NavigationScreenProp<NavigationState, {}>;
};

type ComponentState = {
  showMoreInfoModal: boolean;
};

export class DemoDetailsScreen extends React.Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    showMoreInfoModal: false,
  };

  openShowMoreInfoModal = () => this.setState({ showMoreInfoModal: true });

  closeShowMoreInfoModal = () => this.setState({ showMoreInfoModal: false });

  render() {
    // @ts-ignore
    const demoName = this.props.navigation.getParam('demo', 'Hello');
    // @ts-ignore
    const deviceImage = this.props.navigation.getParam('device', '');

    return (
      <Container>
        <Header title="Demo Transacciones" />
        <Content>
          <View style={styles.titleContainer}>
            <View style={styles.imageSection}>
              <Image
                source={{ uri: deviceImage, cache: 'only-if-cached' }}
                style={styles.image}
              />
            </View>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{demoName}</Text>
            </View>
          </View>
          <View style={styles.videoBox}>
            <MaterialIcon name={Icons.playCircle} size={50} color={Colors.white} />
          </View>
        </Content>
        <Footer>
          <Button
            text="Mas Información"
            backgroundColor={Colors.lightGray3}
            textColor={Colors.dark}
            onPress={this.openShowMoreInfoModal}
          />
        </Footer>
        <MoreInfoModal
          visible={this.state.showMoreInfoModal}
          onClose={this.closeShowMoreInfoModal}
        />
      </Container>
    );
  }
}
