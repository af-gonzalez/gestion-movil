import * as React from 'react';
import * as Yup from 'yup';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import { Container, Content, Footer, Header } from '@components/layout';
import { Button, ImagePickerModal, MaterialIcon } from '@components/commons';
import { FormContainer } from '@components/form';
import { Colors, Icons } from '@constants/styles';
import { FormValidationMessage } from '@constants/messages';
import { toggleImagePicker } from '@store/modals';

import { CustomerForm, FormValues } from './customer-form';
import { styles } from './customer-info-form.styles';

const defaultImage = require('../../../../../assets/girl.jpg');

type PropsFromDispatch = {
  toggleImagePicker?: typeof toggleImagePicker;
};

type ComponentState = {
  userAvatarUri: string;
  scrollOffset: number;
};

// @ts-ignore
@connect(null, { toggleImagePicker })
export class CustomerInfoFormScreen extends React.Component<PropsFromDispatch, ComponentState> {
  customerFormSchema: Yup.ObjectSchema<FormValues>;
  customerForm = React.createRef<Formik<FormValues>>();

  constructor(props) {
    super(props);

    this.state = {
      userAvatarUri: null,
      scrollOffset: 0,
    };

    this.customerFormSchema = Yup.object().shape({
      name: Yup.string().required(FormValidationMessage.Required),
      phoneNumber: Yup.string().required(FormValidationMessage.Required),
    });

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSelectAction = this.handleSelectAction.bind(this);
    this.handleImageSelection = this.handleImageSelection.bind(this);
  }

  handleSelectAction(): void {
    this.props.toggleImagePicker();
  }

  handleFormSubmit(result: FormValues): void {
  }

  handleImageSelection(userAvatarUri: string): void {
    this.setState({ userAvatarUri });
  }

  render() {
    const { userAvatarUri } = this.state;
    const initialValues: FormValues = {
      name: '',
      phoneNumber: '',
    };

    return (
      <Container>
        <Header title="Editar Información" mainView />
        <Content style={{ padding: 10 }}>
          <FormContainer>
            <View style={styles.imageContainer}>
              <View style={styles.imageSection}>
                <Image
                  source={userAvatarUri ? { uri: userAvatarUri } : defaultImage}
                  style={styles.userImage}
                />
              </View>
              <View style={styles.selectButtonSection}>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={this.handleSelectAction}
                >
                  <MaterialIcon name={Icons.camera} color={Colors.dark} size={24} />
                  <Text style={styles.selectImageText}>Cambiar Imagen</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Formik
              initialValues={initialValues}
              onSubmit={this.handleFormSubmit}
              validationSchema={this.customerFormSchema}
              component={CustomerForm}
              ref={this.customerForm}
            />
          </FormContainer>
        </Content>
        <Footer>
          <Button
            text="Guardar"
            icon={Icons.check}
            onPress={() => this.customerForm.current.submitForm()}
          />
        </Footer>
        <ImagePickerModal onSelectImage={this.handleImageSelection} />
      </Container>
    );
  }
}
