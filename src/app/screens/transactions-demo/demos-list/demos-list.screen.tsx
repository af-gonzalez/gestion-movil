import * as React from 'react';
import { Image, Text, View, ScrollView } from 'react-native';

import { NavigationInjectedProps } from 'react-navigation';
import { Container, Content, Footer, Header } from '../../../components/layout/index';
import { Button, InputRadio, MaterialIcon, SelectBox } from '../../../components/commons/index';
import { Colors, Icons } from '../../../../config/constants/styles';

import { styles } from './demos-list.styles';
import { connect, MapStateToProps } from 'react-redux';

type ComponentState = {
  demosList: string[],
  selectedDemo: string;
  devices: SelectionBoxOption[],
  selectedDevice: string;
  selectedDeviceImage: string;
  loadingContent: boolean;
  disableContainerListeners: boolean;
};

type PropsFromState = {
  references: DeviceReference[];
};

type ComponentProps = PropsFromState & NavigationInjectedProps;

const mapStateToProps: MapStateToProps<PropsFromState, {}, ReduxStore> =
  ({ devices: { references } }) => ({ references });

// @ts-ignore
@connect(mapStateToProps)
export class DemosListScreen extends React.Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    demosList: [
      'Venta Tarjeta Debito',
      'Venta Tarjeta Credito',
      'Venta con QR',
      'Anulacion',
      'Duplicado',
      'Cierre',
      'Pado de Servicios',
      'Recargas',
      'Lealtad',
    ],
    selectedDemo: 'Venta Tarjeta Debito',
    devices: [],
    selectedDevice: null,
    selectedDeviceImage: null,
    loadingContent: true,
    disableContainerListeners: false,
  };

  constructor(props: ComponentProps) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer',
    ];
  }

  async componentDidMount() {
    const devices: SelectionBoxOption[] = [];

    this.setState({
      devices,
      selectedDevice: devices[0].value,
      selectedDeviceImage: devices[0].image,
      loadingContent: false,
    });
  }

  showDemoDetails = () => {
    const { selectedDemo, selectedDeviceImage } = this.state;
    this.props.navigation.navigate('DemoDetails', {
      demo: selectedDemo,
      device: selectedDeviceImage,
    });
  }

  handleDeviceSelectionBoxChange = ({ value, image }: SelectionBoxOption) => {
    this.setState({
      selectedDevice: value,
      selectedDeviceImage: image,
    });
  }

  handleSelectBoxToggleModal = (disableContainerListeners: boolean) => {
    this.setState({ disableContainerListeners });
  }

  render() {
    return (
      <Container disableKeyboardListeners={this.state.disableContainerListeners}>
        <Header title="Demo Transacciones" mainView />
        <Content loadingContent={this.state.loadingContent}>
          <ScrollView style={{ flex: 1 }}>
            {this.state.demosList.map((demo, index) => (
              <View style={styles.container} key={index}>
                <View style={styles.titleSection}>
                  <MaterialIcon name={Icons.tvPlay} size={24} color={Colors.blue} />
                  <Text style={styles.title}>{demo}</Text>
                </View>
                <InputRadio onPress={() => this.setState({ selectedDemo: demo })}
                            selected={demo === this.state.selectedDemo} />
              </View>
            ))}
          </ScrollView>
          <View style={styles.boxContainer}>
            <View style={styles.imageSection}>
              {this.state.selectedDeviceImage && (
                <Image source={{ uri: this.state.selectedDeviceImage, cache: 'only-if-cached' }}
                       style={styles.deviceImage} />
              )}
            </View>
            <View style={styles.selectBoxSection}>
              <SelectBox
                label="Dispositivo"
                selectedValue={this.state.selectedDevice}
                onChange={this.handleDeviceSelectionBoxChange}
                options={this.state.devices}
                onToggleModal={this.handleSelectBoxToggleModal}
                withFilter
              />
            </View>
          </View>
        </Content>
        <Footer>
          <Button
            icon={Icons.playCircle}
            text="Ver Demo"
            onPress={this.showDemoDetails}
          />
        </Footer>
      </Container>
    );
  }
}
