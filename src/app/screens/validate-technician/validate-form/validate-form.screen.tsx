import * as React from 'react';
import { View, Alert } from 'react-native';
import { Container, Content, Header } from '@components/layout';
import { Button, InputText } from '@components/commons';
import { FontSizes, Icons } from '../../../../config/constants/styles';
import { SuccessValidationModal } from '../success-validation';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const validateTech = gql`
mutation asd($documentNumber: String!){
  validateTech(documentNumber: $documentNumber){
    id
    fullname
    email
    profileImage
  }
}
`;

type ComponentState = {
  showSuccessValidationModal: boolean;
  techId: string;
  tech: User;
};

export class ValidateFormScreen extends React.Component<{}, ComponentState> {
  state: ComponentState = {
    showSuccessValidationModal: false,
    techId: '',
    tech: null,
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
              value={this.state.techId}
              label="Número de cedula"
              placeholder="Número de cedula del tecnico"
              onChange={techId => this.setState({ techId })}
              style={{ marginBottom: 10 }}
            />
            <Mutation mutation={validateTech} >
              {(vali, { loading }) => (
                <Button text="Validar" icon={Icons.forward} height={45}
                        fontSize={FontSizes.small}
                        onPress={() => vali({
                          variables: { documentNumber: this.state.techId}
                                            })
                          .then(({ data: { validateTech: user}}) => {
                            console.log(user);
                            if(user){
                              this.setState({
                                tech: user,
                                showSuccessValidationModal: true,
                                            })
                            } else {
                              Alert.alert('Error', 'Tecnico no existe');
                            }
                          })}
                        withLoading
                        loading={loading}
                />
              )}
            </Mutation>
          </View>
        </Content>
        <SuccessValidationModal
          visible={this.state.showSuccessValidationModal}
          onClose={this.closeSuccessValidationModal}
          user={this.state.tech}
        />
      </Container>
    );
  }
}
