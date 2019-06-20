import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Content, Header } from '@components/layout';

import { styles } from './tutorials-list.styles';
import { MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../config/constants/styles';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

type ComponentProps = {
  navigation: NavigationScreenProp<NavigationState, {}>;
};

export const TutorialsListScreen: React.SFC<ComponentProps> = ({ navigation }) => {
  return (
    <Container>
      <Header title="Tutoriales Tecnicos" mainView />
      <Content>
        <View style={styles.container}>
          <View style={styles.titleSection}>
            <MaterialIcon name={Icons.circle} size={10} color={Colors.dark} />
            <Text style={styles.title}>Instalación de Software</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TutorialDetails', { title: 'Instalación de Software' })}>
            <MaterialIcon name={Icons.chevronRight} size={30} color={Colors.complementary} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.titleSection}>
            <MaterialIcon name={Icons.circle} size={10} color={Colors.dark} />
            <Text style={styles.title}>Cambio de display en datáfono</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TutorialDetails', { title: 'Cambio de display en datáfono' })}>
            <MaterialIcon name={Icons.chevronRight} size={30} color={Colors.complementary} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.titleSection}>
            <MaterialIcon name={Icons.circle} size={10} color={Colors.dark} />
            <Text style={styles.title}>Actualización de Software</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TutorialDetails', { title: 'Actualización de Software' })}>
            <MaterialIcon name={Icons.chevronRight} size={30} color={Colors.complementary} />
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
};
