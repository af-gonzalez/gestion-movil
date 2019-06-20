import * as React from 'react';
import { View, Text } from 'react-native';

import { styles } from './restore-password.styles';
import { Colors, Icons } from '../../../../config/constants/styles';
import { Button, InputRadio, InputText } from '@components/commons';
import { NavigationInjectedProps } from 'react-navigation';

type ComponentState = {
  placeholder: string,
  icon: Icons,
  selectedOption: number;
};

export class RestorePasswordScreen extends React.Component<Partial<NavigationInjectedProps>, ComponentState> {
  options = [
    {
      id: 1,
      name: 'Solicitar con usuario',
      icon: Icons.account,
      placeholder: 'Nombre de usuario',
    },
    {
      id: 2,
      name: 'Solicitar con correo',
      icon: Icons.email,
      placeholder: 'Correo electronico',
    },
  ];
  state: ComponentState = {
    placeholder: 'Nombre de usuario',
    icon: Icons.account,
    selectedOption: 1,
  };

  handleOptionSelection = (id: number) => {
    const selectedOption = this.options.find(option => option.id === id);
    this.setState({
      selectedOption: id,
      icon: selectedOption.icon,
      placeholder: selectedOption.placeholder,
    });
  }

  render() {
    const { icon, placeholder } = this.state;

    return (
      <View>
        <View style={{ flex: 1 }}>
          {
            this.options.map(({ id, name }) => (
              <View style={styles.listItem} key={id}>
                <InputRadio selected={id === this.state.selectedOption}
                            onPress={() => this.handleOptionSelection(id)}
                />
                <Text style={styles.listItemText}>{name}</Text>
              </View>
            ))
          }
          <InputText
            leftIcon={icon}
            placeholder={placeholder}
            boxStyle={{ paddingHorizontal: 15 }}
            style={styles.input}
          />
        </View>

        <View style={{ width: '100%' }}>
          <Button text="Volver"
                  icon={Icons.chevronLeft}
                  iconSize={30}
                  backgroundColor="#FCFCFC"
                  textColor={Colors.dark}
                  width="97%"
                  height={45}
                  style={{ alignSelf: 'center' }}
                  onPress={() => this.props.navigation.goBack()}
                  reversed
          />
          <View style={{ height: 10 }} />
          <Button text="Confirmar"
                  icon={Icons.mailSend}
                  iconSize={24}
                  height={45}
                  width="97%"
                  style={{ alignSelf: 'center' }}
          />
        </View>
      </View>
    );
  }
}
