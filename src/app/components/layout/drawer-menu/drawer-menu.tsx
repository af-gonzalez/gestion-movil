import * as React from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { AsyncStorage, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Icons } from '@constants/styles';
import { MaterialIcon } from '../../commons';

import { styles } from './drawer-menu.styles';

type ComponentState = {
  isCustomer: boolean;
  sessionUser: User;
};

export class DrawerMenu extends React.Component<any, ComponentState> {
  state: ComponentState = {
    isCustomer: false,
    sessionUser: null,
  };

  async componentDidMount(): Promise<void> {
    const isCustomer = (await AsyncStorage.getItem('userRole')) === 'CommerceModule';
    const sessionUser: SessionUser = JSON.parse(await AsyncStorage.getItem('sessionUser'));
    this.setState({ isCustomer, sessionUser: sessionUser.user });
  }

  render() {
    const { items, ...rest } = this.props;
    const { sessionUser } = this.state;
    const filteredItems = items.filter(item => item.key !== 'CustomerInfoSection');

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {sessionUser && (
            <React.Fragment>
              <View style={styles.avatarContainer}>
                {sessionUser.profileImage && (
                  <Image source={{ uri: sessionUser.profileImage }} style={styles.userAvatar} />
                )}
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={styles.userName}>{sessionUser.name}</Text>
                <Text style={styles.userName}>{sessionUser.lastname}</Text>
                {this.state.isCustomer && (
                  <TouchableOpacity
                    style={styles.editInfoButton}
                    onPress={() => this.props.navigation.navigate('CustomerInfoSection')}
                  >
                    <MaterialIcon name={Icons.edit} color={Colors.white} size={16} />
                    <Text style={styles.editInfoText}>Editar Información</Text>
                  </TouchableOpacity>
                )}
              </View>
            </React.Fragment>
          )}
        </View>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems items={filteredItems} {...rest} />
        </SafeAreaView>
        <View style={styles.closeSessionLinkContainer}>
          <TouchableOpacity onPress={async () => {
            await AsyncStorage.removeItem('sessionUser');
            this.props.navigation.navigate('AuthModule');
          }}>
            <Text style={styles.closeSessionLink}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
