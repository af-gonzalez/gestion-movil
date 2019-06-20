import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Container, Content, Footer, Header } from '@components/layout';
import { styles } from './init-service.styles';
import { Button, Checkbox, DividedInfo, InputText, MaterialIcon } from '@components/commons';
import { Colors, FontSizes, Icons } from '../../../../config/constants/styles';
import { connect, MapStateToProps } from 'react-redux';
import { DeviceMaintenanceModal } from './device-mantenance';
import { InfoItem } from '../finish-service/info-item';
import { initService } from '../../../../store/schedule';
import { Subject } from 'rxjs';
import { NavigationInjectedProps } from 'react-navigation';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const initServiceMutation = gql`
  mutation initService($serviceId: String!){
    initService(serviceId: $serviceId) {
      success
      message
    }
  }
`;

type ComponentState = {
  serviceReasons: { name: string, selected: boolean }[];
  devicesMaintenances: DeviceMaintenance[];
  showMaintenanceModal: boolean;
  mainteanceEnabled: boolean;
};

type PropsFromState = {
  commerceDevices: Device[];
};

type PropsFromDispatch = {
  initService?: typeof initService;
};

type ComponentProps = PropsFromState & PropsFromDispatch & Partial<NavigationInjectedProps>;

const mapStateToProps: MapStateToProps<PropsFromState, {}, ReduxStore> =
  ({ devices: { list } }) => ({ commerceDevices: list });

// @ts-ignore
@connect(mapStateToProps, { initService })
export class InitServiceScreen extends React.Component<ComponentProps, ComponentState> {
  scrollView = React.createRef<ScrollView>();
  editSubject = new Subject<DeviceMaintenance>();
  state: ComponentState = {
    serviceReasons: [
      { name: 'Instalacion POS', selected: false },
      { name: 'Retiro POS', selected: false },
      { name: 'Mantenimento Tecnico', selected: false },
      { name: 'Administrativo', selected: false },
      { name: 'Comercial', selected: false },
      { name: 'Publicidad', selected: false },
    ],
    showMaintenanceModal: false,
    devicesMaintenances: [],
    mainteanceEnabled: false,
  };

  handleInputFocus = (position: number) => {
    this.scrollView.current.scrollTo({ y: position });
  }

  closeMaintenanceModal = () => this.setState({ showMaintenanceModal: false });

  openMaintenanceModal = () => this.setState({ showMaintenanceModal: true });

  handleModalSuccess = (mainTenance: DeviceMaintenance) => {
    this.setState(({ devicesMaintenances }) =>
      ({
        showMaintenanceModal: false,
        devicesMaintenances: [...devicesMaintenances, mainTenance],
      }));
  }

  handleMaintenanceEdit = (index: number) => {
    this.editSubject.next(this.state.devicesMaintenances[index]);
    this.openMaintenanceModal();
  }

  handleMaintenanceRemove = (index: number) => {
    const { devicesMaintenances } = this.state;
    devicesMaintenances.splice(index, 1);

    this.setState({ devicesMaintenances });
  }

  handleModalEdition = (maintenance: DeviceMaintenance) => {
    const { devicesMaintenances } = this.state;
    const index = devicesMaintenances.findIndex(({ device: { id } }) =>
      id === maintenance.device.id);

    devicesMaintenances.splice(index, 1, maintenance);

    this.setState({ devicesMaintenances, showMaintenanceModal: false });
  }

  handleInitServiceAction = () => {
    const { navigation, initService } = this.props;
    const serviceId = navigation.state.params.serviceId;
    initService(serviceId);
  }

  selectReason(index: number): void {
    const { serviceReasons } = this.state;
    const reason = serviceReasons[index];
    reason.selected = !reason.selected;
    if (index === 2) this.setState({ mainteanceEnabled: reason.selected });
    this.setState({ serviceReasons });
  }

  render() {
    return (
      <Container>
        <Header title="Iniciar Servicio" />
        <Content>
          <ScrollView keyboardShouldPersistTaps="handled"
                      ref={this.scrollView}
          >
            <View style={styles.sectionTitle}>
              <MaterialIcon name={Icons.wrench} color={Colors.gray} size={18} />
              <Text style={styles.sectionTitleText}>Ingrese los datos para iniciar el
                servicio</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Motivo de la visita</Text>
            </View>
            {
              this.state.serviceReasons.map(({ name, selected }, index) => (
                <View style={styles.listItem} key={index}>
                  <Text style={styles.listItemText}>{name}</Text>
                  <Checkbox checked={selected} onPress={() => this.selectReason(index)} />
                </View>
              ))
            }
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Mantenimiento de dispositivos</Text>
              <Button text="Agregar"
                      width={90}
                      height={25}
                      icon={Icons.plus}
                      iconSize={20}
                      fontSize={FontSizes.smaller}
                      paddingHorizontal={10}
                      backgroundColor={
                        this.state.mainteanceEnabled ?
                          Colors.lightBlue : Colors.gray
                      }
                      onPress={this.openMaintenanceModal}
                      disabled={!this.state.mainteanceEnabled}

              />
            </View>
            {
              this.state.devicesMaintenances.map((maintenance, index) => (
                <InfoItem key={index}
                          onEdit={() => this.handleMaintenanceEdit(index)}
                          onRemove={() => this.handleMaintenanceRemove(index)}
                >
                  <DividedInfo fontSize={FontSizes.small}
                               title="Serial"
                               description={maintenance.device.serialNumber} />
                  <DividedInfo fontSize={FontSizes.small}
                               title="Placa"
                               description={maintenance.device.plateNumber} />
                  <DividedInfo fontSize={FontSizes.small}
                               title="Terminal"
                               description={maintenance.device.terminalNumer} />
                  <DividedInfo fontSize={FontSizes.small}
                               title="Tipo de falla"
                               description={maintenance.issueType.description} />
                </InfoItem>
              ))
            }
            <InputText label="Observaciones"
                       placeholder="Observaciones sobre el servicio"
                       textArea
                       onFocus={this.handleInputFocus}
                       style={styles.input}
            />
          </ScrollView>
          <DeviceMaintenanceModal visible={this.state.showMaintenanceModal}
                                  onCancel={this.closeMaintenanceModal}
                                  onSuccess={this.handleModalSuccess}
                                  onEdit={this.handleModalEdition}
                                  editionSubject={this.editSubject}

          />
        </Content>
        <Footer>
          <Mutation mutation={initServiceMutation}
                    onCompleted={() => this.props.navigation.goBack()}
          >
            {initService => (
              <Button
                text="Iniciar Servicio"
                icon={Icons.check}
                iconSize={24}
                onPress={() => initService({
                  variables: {
                    serviceId: this.props.navigation.getParam('serviceId', ''),
                  },
                  refetchQueries: ['techServices'],
                })}
              />
            )}
          </Mutation>
        </Footer>
      </Container>
    );
  }
};
