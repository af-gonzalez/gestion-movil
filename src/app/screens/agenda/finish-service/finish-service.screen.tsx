import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Container, Content, Footer, Header } from '@components/layout';

import { styles } from './finish-service.styles';
import { Button, DividedInfo, InputText, SelectBox } from '@components/commons';
import { Colors, FontSizes, Icons } from '../../../../config/constants/styles';

import { InfoItem } from './info-item';
import { DeviceMovementModal } from './device-movement';
import { PhotograpicEvidence } from './photographic-evidence';
import { SecuritySealFormModal } from './security-seal-form';
import { CustomerSignatureModal } from './customer-signature';
import { finishService } from '../../../../store/schedule';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const finishServiceMut = gql`
  mutation finishService($serviceId: String!, $status: String!){
    finishService(serviceId: $serviceId, status: $status) {
      success
      message
    }
  }
`;

type ComponentState = {
  showDeviceMovementModal: boolean;
  showDeviceSealForm: boolean;
  showPinPadSealForm: boolean;
  showSignatureModal: boolean;
  devicesMovements: DeviceMovement[];
  serviceReasons: { name: string, selected: boolean }[];
  serviceState: string;
  deviceSeals: SecuritySealChange[];
  pinPadSeals: SecuritySealChange[];
  movementToEdit: number;
};

type PropsFromDispatch = {
  finishService?: typeof finishService;
};

type ComponentProps = PropsFromDispatch & { navigation: any };

// @ts-ignore
@connect(null, { finishService })
export class FinishServiceScreen extends React.Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    showDeviceMovementModal: false,
    showDeviceSealForm: false,
    showPinPadSealForm: false,
    showSignatureModal: false,
    serviceReasons: [
      { name: 'Instalacion POS', selected: false },
      { name: 'Retiro POS', selected: false },
      { name: 'Manteniento Tecnico', selected: false },
      { name: 'Administrativo', selected: false },
      { name: 'Comercial', selected: false },
      { name: 'Publicidad', selected: false },
    ],
    serviceState: 'Cerrado',
    devicesMovements: [],
    deviceSeals: [{
      previousNumber: 'A232093834',
      newNumber: 'A907093834',
    }],
    pinPadSeals: [],
    movementToEdit: null,
  };

  selectReason(index: number): void {
    const { serviceReasons } = this.state;
    const reason = serviceReasons[index];
    reason.selected = !reason.selected;
    this.setState({ serviceReasons });
  }

  handleServiceSelection = (selectedOption: SelectionBoxOption) => {
    this.setState({ serviceState: selectedOption.value });
  }

  handleNewDeviceMovement = (deviceMovement: DeviceMovement) => {
    this.setState(({ devicesMovements, movementToEdit }) => {
      if (movementToEdit !== null) {
        devicesMovements.splice(movementToEdit, 1, deviceMovement);
        return {
          devicesMovements: [...devicesMovements],
          movementToEdit: null,
          showDeviceMovementModal: false,
        };
      }

      return {
        devicesMovements: [...devicesMovements, deviceMovement],
        showDeviceMovementModal: false,
        movementToEdit: null,
      };
    });
  }

  toggleDeviceSealForm = () => {
    this.setState(({ showDeviceSealForm }) => ({ showDeviceSealForm: !showDeviceSealForm }));
  }

  togglePinPadSealForm = () => {
    this.setState(({ showPinPadSealForm }) => ({ showPinPadSealForm: !showPinPadSealForm }));
  }

  handleFinshServiceAction = () => {
    this.setState({ showSignatureModal: false });
    this.props.finishService();
  };

  render() {
    const { movementToEdit, devicesMovements } = this.state;
    return (
      <Container>
        <Header title="Finalizar Servicio" />
        <Content>
          <ScrollView>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Relación de activos</Text>
              <Button
                text="Agregar"
                width={90}
                height={25}
                icon={Icons.plus}
                iconSize={20}
                fontSize={FontSizes.smaller}
                paddingHorizontal={10}
                backgroundColor={Colors.lightBlue}
                onPress={() => this.setState({ showDeviceMovementModal: true })}
              />
            </View>
            {
              this.state.devicesMovements.map((
                {
                  deviceIn,
                  deviceOut,
                  noveltyType,
                  terminalNumber,
                },
                index) => (
                <InfoItem key={index} onEdit={() => {
                  this.setState(({ devicesMovements }) => ({
                    movementToEdit: index,
                    showDeviceMovementModal: true,
                  }));
                }}>
                  {deviceIn && (
                    <React.Fragment>
                      <DividedInfo
                        fontSize={FontSizes.smaller}
                        title="Entrada"
                        description="Tipo :"
                        span={deviceIn.type}
                      />
                      <DividedInfo
                        fontSize={FontSizes.smaller}
                        description="Placa :"
                        span={deviceIn.boardNumber}
                      />
                      <DividedInfo
                        fontSize={FontSizes.smaller}
                        description="Serial :"
                        span={deviceIn.serial}
                      />
                    </React.Fragment>
                  )}
                  {deviceOut && (
                    <React.Fragment>
                      <DividedInfo
                        fontSize={FontSizes.smaller}
                        title="Salida"
                        description="Tipo :"
                        span={deviceOut.type}
                      />
                      <DividedInfo
                        fontSize={FontSizes.smaller}
                        description="Placa :"
                        span={deviceOut.boardNumber}
                      />
                      <DividedInfo
                        fontSize={FontSizes.smaller}
                        description="Serial :"
                        span={deviceOut.serial}
                      />
                    </React.Fragment>
                  )}
                  <DividedInfo
                    fontSize={FontSizes.smaller}
                    title="Tipo de novedad"
                    description={noveltyType}
                  />
                </InfoItem>
              ))
            }
            <View style={styles.paddedContent}>
              <InputText
                label="Observaciones"
                placeholder="Observaciones de la visita"
                textArea
              />
            </View>
            <View style={styles.paddedContent}>
              <SelectBox
                label="Estado del servicio"
                selectedValue={this.state.serviceState}
                options={[
                  { label: 'Cerrado', value: 'Cerrado' },
                  { label: 'Pendiente', value: 'Pendiente' },
                ]}
                onChange={this.handleServiceSelection}
              />
            </View>
          </ScrollView>
        </Content>
        <DeviceMovementModal
          visible={this.state.showDeviceMovementModal}
          onCancel={() => this.setState({ showDeviceMovementModal: false, movementToEdit: null })}
          onSave={this.handleNewDeviceMovement}
          movementToEdit={movementToEdit !== null ? devicesMovements[movementToEdit] : null}
        />
        <SecuritySealFormModal
          visible={this.state.showDeviceSealForm}
          onCancel={() => this.setState({ showDeviceSealForm: false })}
          onSave={() => true}
        />
        <SecuritySealFormModal
          visible={this.state.showPinPadSealForm}
          onCancel={() => this.setState({ showPinPadSealForm: false })}
          onSave={() => true}
        />
        <CustomerSignatureModal
          visible={this.state.showSignatureModal}
          onCancel={() => this.setState({ showSignatureModal: false })}
          onSuccess={this.handleFinshServiceAction}
        />
        <Footer>
          <Mutation
            mutation={finishServiceMut}
            onCompleted={() => this.props.navigation.goBack()}
          >
            {
              finishService => (
                <Button
                  text="Finalizar Servicio"
                  icon={Icons.check}
                  onPress={() => finishService({
                    variables: {
                      serviceId: this.props.navigation.getParam('serviceId', ''),
                      status: this.state.serviceState,
                    },
                    refetchQueries: ['techServices'],
                  })}
                />
              )
            }
          </Mutation>
        </Footer>
      </Container>
    );
  }
}
