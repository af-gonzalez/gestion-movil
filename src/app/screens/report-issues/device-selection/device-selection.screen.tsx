import * as React from 'react';
import { View } from 'react-native';
import { Container, Content, Footer, Header } from '@components/layout';
import { Button, SelectBox } from '@components/commons';
import { Icons } from '../../../../config/constants/styles';
import { NavigationInjectedProps } from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';

type PropsFromState = {
  devicesReferences: DeviceReference[];
  devices: Device[];
};

type ComponentProps = PropsFromState & NavigationInjectedProps;

type ComponentState = {
  referencesOptions: SelectionBoxOption[];
  selectedReference: string;
  devicesOptions: SelectionBoxOption[];
  selectedDevice: string;
};

const mapStateToProps: MapStateToProps<PropsFromState, {}, ReduxStore> =
  ({ devices: { list, references } }) => ({ devices: list, devicesReferences: references });

// @ts-ignore
@connect(mapStateToProps)
export class DeviceSelectionScreen extends React.Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    selectedReference: null,
    selectedDevice: null,
    referencesOptions: [],
    devicesOptions: [],
  };

  async componentDidMount() {
    const { devices } = this.props;
    const referencesOptions: SelectionBoxOption[] = [];
    const devicesOptions: SelectionBoxOption[] = [];
    const selectedReference = referencesOptions[0].value;
    for (const device of devices) {
      if (device.reference.id === selectedReference) {
        devicesOptions.push({
          value: device.id,
          label: device.serialNumber,
        });
      }
    }
    const selectedDevice = devicesOptions[0].value;
    this.setState({
      referencesOptions,
      devicesOptions,
      selectedDevice,
      selectedReference,
    });
  }

  handleDeviceReferenceChange = (selectedReference: SelectionBoxOption) => {
    const { devices } = this.props;
    const devicesOptions: SelectionBoxOption[] = [];
    for (const device of devices) {
      if (device.reference.id === selectedReference.value) {
        devicesOptions.push({
          value: device.id,
          label: device.serialNumber,
        });
      }
    }

    this.setState({
      devicesOptions,
      selectedReference: selectedReference.value,
      selectedDevice: devicesOptions[0].value,
    });
  }

  handleDeviceChange = (selectedDevice: SelectionBoxOption) => this.setState({
    selectedDevice: selectedDevice.value,
  })

  render() {
    return (
      <Container>
        <Header title="Reporte Solicitud" mainView />
        <Content>
          <View style={{ paddingHorizontal: 10 }}>
            <SelectBox
              label="Tipo de Datafono"
              selectedValue={this.state.selectedReference}
              onChange={this.handleDeviceReferenceChange}
              options={this.state.referencesOptions}
            />
            <SelectBox
              label="Serial"
              selectedValue={this.state.selectedDevice}
              onChange={this.handleDeviceChange}
              options={this.state.devicesOptions}
            />
          </View>
        </Content>
        <Footer>
          <Button
            text="Ver detalles"
            icon={Icons.viewList}
            onPress={() => this.props.navigation.navigate('DeviceDetailsScreen')}
          />
        </Footer>
      </Container>
    );
  }
}
