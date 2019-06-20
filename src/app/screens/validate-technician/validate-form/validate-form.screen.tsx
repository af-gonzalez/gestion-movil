import * as React from 'react';
import { View } from 'react-native';
import { Container, Content, Header } from '@components/layout';
import { Button, InputText } from '@components/commons';
import { FontSizes, Icons } from '../../../../config/constants/styles';
import { SuccessValidationModal } from '../success-validation';

type ComponentState = {
  showSuccessValidationModal: boolean;
};

export class ValidateFormScreen extends React.Component<{}, ComponentState> {
  state: ComponentState = {
    showSuccessValidationModal: false,
  };

  openSuccessValidationModal = () => this.setState({
    showSuccessValidationModal: true,
  })

  closeSuccessValidationModal = () => this.setState({
    showSuccessValidationModal: false,
  })

  render() {
    return (
      <Container>
        <Header title="Validar Tecnico" mainView />
        <Content>
          <View style={{ paddingHorizontal: 10 }}>
            <InputText
              label="Número de cedula"
              placeholder="Número de cedula del tecnico"
              style={{ marginBottom: 10 }}
            />
            <Button text="Validar" icon={Icons.forward} height={45}
                    fontSize={FontSizes.small}
                    onPress={this.openSuccessValidationModal}
            />
          </View>
        </Content>
        <SuccessValidationModal
          visible={this.state.showSuccessValidationModal}
          onClose={this.closeSuccessValidationModal} />
      </Container>
    );
  }
}
