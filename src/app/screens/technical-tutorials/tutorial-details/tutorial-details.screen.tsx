import * as React from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Header } from '@components/layout';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import { styles } from './tutorial-details.styles';

type ComponentProps = {
  navigation: NavigationScreenProp<NavigationState, {}>;
};

export const TutorialDetailsScreen: React.SFC<ComponentProps> = ({ navigation }) => {
  const title = navigation.state.params.title;

  return (
    <Container>
      <Header title="Tutoriales Tecnicos" />
      <Content>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.detailsText}>
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.
          </Text>
          <Text style={styles.detailsText}>
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.
          </Text>
        </View>
      </Content>
    </Container>
  );
};
