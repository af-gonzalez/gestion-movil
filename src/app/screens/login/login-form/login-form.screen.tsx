import * as React from 'react';
import * as Yup from 'yup';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { styles } from './login-form.styles';
import { Button, InfoMessageModal } from '@components/commons';
import { NavigationInjectedProps } from 'react-navigation';
import { Formik } from 'formik';
import { LoginForm, LoginFormValues } from './login-form';
import { FormValidationMessage } from '@constants/messages';

type ComponentState = {
  showMessageModal: boolean;
  modalMessage: string;
};

type ComponentProps = Partial<NavigationInjectedProps>;

const loginMutation = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginResult:loginUser(username: $username, password: $password) {
      jwtToken
      user {
        id
        name
        lastname
        fullname
        email
        username
        profileImage
        roles{
          name
        }
      }
    }
  }
`;

export class LoginFormScreen extends React.PureComponent<ComponentProps, ComponentState> {
  loginFormSchema: Yup.ObjectSchema<LoginFormValues>;
  loginForm: React.RefObject<Formik<LoginFormValues>>;

  constructor(props) {
    super(props);

    this.state = {
      showMessageModal: false,
      modalMessage: 'Usuario y/o contraseña incorrectos',
    };

    this.loginForm = React.createRef<Formik<LoginFormValues>>();
    this.loginFormSchema = Yup.object().shape({
      username: Yup.string().required(FormValidationMessage.Required),
      password: Yup.string().required(FormValidationMessage.Required),
    });

    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    this.handleLoginUserError = this.handleLoginUserError.bind(this);

  }

  closeMessageModal = () => this.setState({ showMessageModal: false });

  handleRestorePassAction = () => {
    this.props.navigation.navigate('RestorePassForm');
  }

  async handleLoginFormSubmit({ loginResult }: { loginResult: SessionUser }): Promise<void> {
    const { user } = loginResult;
    await AsyncStorage.setItem('sessionUser', JSON.stringify(loginResult));
    if (user.roles.some(({ name }) => name === 'CUSTOMER')) {
      this.props.navigation.navigate('CommerceModule');
    } else if (user.roles.some(({ name }) => name === 'TECHNICIAN')) {
      this.props.navigation.navigate('TechnicianModule');
    }
  }

  handleLoginUserError(error): void {
    this.setState({ showMessageModal: true });
  }

  render() {
    const initialValues: LoginFormValues = { username: '', password: '' };
    return (
      <Mutation mutation={loginMutation}
                onCompleted={this.handleLoginFormSubmit}
                onError={this.handleLoginUserError}
      >
        {(loginUser, { loading: isLoginUser }) => (
          <React.Fragment>
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={({ username, password }: LoginFormValues) => {
                    loginUser({ variables: { username, password } });
                  }}
                  validationSchema={this.loginFormSchema}
                  component={LoginForm}
                  ref={this.loginForm}
                />
              </View>
            </View>
            <View>
              <Button text="Iniciar Sesion"
                      onPress={() => this.loginForm.current.submitForm()}
                      height={45}
                      loading={isLoginUser}
                      withLoading={true}
              />
            </View>
            <InfoMessageModal visible={this.state.showMessageModal}
                              onClose={this.closeMessageModal}
                              message={this.state.modalMessage}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}
