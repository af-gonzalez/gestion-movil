import * as React from 'react';
import { Text, View, AsyncStorage } from 'react-native';

import { styles } from './token-form.styles';
import { Colors, Icons } from '../../../../config/constants/styles';
import { Button, InputText } from '@components/commons';
import { NavigationInjectedProps } from 'react-navigation';
import { LoginContainer } from '..';

type PropsFromDispatch = {
  login: () => void;
};

type ComponentProps = Partial<NavigationInjectedProps> & PropsFromDispatch;

export class TokenFormScreen extends React.Component<ComponentProps> {

  handleBackAction = () => {
    this.props.navigation.goBack();
  }

  handleConfirmAction = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    const role = await AsyncStorage.getItem('userRole');
    this.props.navigation.navigate(role);
  }

  render() {
    return (
      <LoginContainer>
        <View style={{ flex: 1 }}>
          <View style={{
            alignSelf: 'stretch',
            paddingHorizontal: 15,
            borderRadius: 5,
            height: 120,
            alignItems: 'center',
          }}>
            <Text style={styles.restorePassText}>Introduzca su token de autenticación</Text>
            <InputText
              leftIcon={Icons.key}
              placeholder="Token de acceso"
              style={styles.input}
              boxStyle={styles.inputBoxStyle}
            />
          </View>
        </View>
        <View style={{ width: '100%' }}>
          <Button text="Cancelar"
                  icon={Icons.close}
                  iconSize={24}
                  backgroundColor="#FCFCFC"
                  textColor={Colors.dark}
                  width="97%"
                  style={{ alignSelf: 'center' }}
                  onPress={this.handleBackAction}
                  height={45}
          />
          <View style={{ height: 10 }} />
          <Button text="Confirmar"
                  icon={Icons.forward}
                  iconSize={24}
                  width="97%"
                  style={{ alignSelf: 'center' }}
                  onPress={this.handleConfirmAction}
                  height={45}
          />
        </View>
      </LoginContainer>
    );
  }
}
