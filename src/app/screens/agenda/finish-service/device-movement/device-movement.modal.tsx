import * as React from 'react';
import { Text, View } from 'react-native';
import { Checkbox, InputText, Modal, SelectBox } from '@components/commons';

import { styles } from './device-movement.styles';
import { isObject } from 'rxjs/internal-compatibility';
import { connect, MapStateToProps } from 'react-redux';

type PropsFromState = {
  commerceDevices?: Device[];
};

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onSave: (data: DeviceMovement) => void,
  movementToEdit: DeviceMovement;
};

type ComponentProps = PropsFromState & OwnProps;

type ComponentState = {
  inSection: boolean;
  outSection: boolean;
  deviceTypes: { label: string, value: string }[];
  noveltyTypes: { label: string, value: string }[];
  deviceMovement: DeviceMovement;
  devicesSerials: SelectionBoxOption[],
  selectedDeviceSerial: string;
};

const initialState: ComponentState = {
  inSection: false,
  outSection: false,
  deviceTypes: [
    { label: 'Minidatafono', value: 'Minidatafono' },
    { label: 'Datafono', value: 'Datafono' },
  ],
  noveltyTypes: [
    { label: 'Retiro', value: 'Retiro' },
    { label: 'Otros', value: 'Otros' },
  ],
  deviceMovement: {
    noveltyType: 'Retiro',
    terminalNumber: null,
  },
  devicesSerials: [],
  selectedDeviceSerial: null,
};

const mapStateToProps: MapStateToProps<PropsFromState, OwnProps, ReduxStore> =
  ({ devices: { list } }) => ({ commerceDevices: list });

// @ts-ignore
@connect(mapStateToProps)
export class DeviceMovementModal extends React.Component<ComponentProps, ComponentState> {
  state = initialState;

  componentWillReceiveProps(nextProps: ComponentProps) {
    const { movementToEdit } = nextProps;
    if (isObject(movementToEdit)) {
      this.setState({
        deviceMovement: movementToEdit,
        inSection: isObject(movementToEdit.deviceIn),
        outSection: isObject(movementToEdit.deviceOut),
      });
    }
  }

  componentDidMount() {
    const devicesSerials: SelectionBoxOption[] = [];
    for (const device of this.props.commerceDevices) {
      devicesSerials.push({
        value: device.id,
        label: device.serialNumber,
      });
    }

    this.setState({
      devicesSerials,
      selectedDeviceSerial: devicesSerials[0].value,
    });
  }

  toggleInSection = () => {
    this.setState(({ inSection, deviceMovement, deviceTypes }) => ({
      inSection: !inSection,
      deviceMovement: {
        ...deviceMovement,
        deviceIn: inSection ? null : {
          type: deviceTypes[0].label,
          boardNumber: null,
          serial: null,
        },
      },
    }));
  }

  toggleOutSection = () => {
    const { commerceDevices } = this.props;
    this.setState(({ outSection, deviceMovement, deviceTypes }) => ({
      outSection: !outSection,
      deviceMovement: {
        ...deviceMovement,
        deviceOut: outSection ? null : {
          type: deviceTypes[0].label,
          boardNumber: commerceDevices[0].plateNumber,
          serial: commerceDevices[0].serialNumber,
        },
      },
    }));
  }

  sendData = () => {
    this.props.onSave(this.state.deviceMovement);
    this.setState(initialState);
  }

  cancel = () => {
    this.props.onCancel();
    this.setState(initialState);
  }

  handleNoveltyTypeChange = (noveltyType: SelectionBoxOption) => {
    this.setState(({ deviceMovement }) => ({
      deviceMovement: {
        ...deviceMovement,
        noveltyType: noveltyType.value,
      },
    }));
  }

  handleTerminalNumberChange = (terminalNumber: string) => {
    this.setState(({ deviceMovement }) => ({
      deviceMovement: {
        ...deviceMovement,
        terminalNumber,
      },
    }));
  }

  handleInDeviceTypeChange = (type: SelectionBoxOption) => {
    this.setState(({ deviceMovement }) => ({
      deviceMovement: {
        ...deviceMovement,
        deviceIn: { ...deviceMovement.deviceIn, type: type.value },
      },
    }));
  }

  handleInDeviceBoardNumberChange = (boardNumber: string) => {
    this.setState(({ deviceMovement }) => ({
      deviceMovement: {
        ...deviceMovement,
        deviceIn: { ...deviceMovement.deviceIn, boardNumber },
      },
    }));
  }

  handleInDeviceSerialChange = (serial: string) => {
    this.setState(({ deviceMovement }) => ({
      deviceMovement: {
        ...deviceMovement,
        deviceIn: { ...deviceMovement.deviceIn, serial },
      },
    }));
  }

  handleOutDeviceTypeChange = (type: SelectionBoxOption) => {
    this.setState(({ deviceMovement }) => ({
      deviceMovement: {
        ...deviceMovement,
        deviceOut: { ...deviceMovement.deviceOut, type: type.value },
      },
    }));
  }

  handleOutDeviceBoardNumberChange = (boardNumber: string) => {
    this.setState(({ deviceMovement }) => ({
      deviceMovement: {
        ...deviceMovement,
        deviceOut: { ...deviceMovement.deviceOut, boardNumber },
      },
    }));
  }

  handleOutDeviceSerialChange = (serial: string) => {
    this.setState(({ deviceMovement }) => ({
      deviceMovement: {
        ...deviceMovement,
        deviceOut: { ...deviceMovement.deviceOut, serial },
      },
    }));
  }

  handleSerialSelectorChange = (selectedOption: SelectionBoxOption) => {
    const device = this.props.commerceDevices.find(({ id }) => id === selectedOption.value);
    this.setState(({ deviceMovement }) => ({
      selectedDeviceSerial: selectedOption.value,
      deviceMovement: {
        ...deviceMovement,
        deviceOut: {
          ...deviceMovement.deviceOut,
          serial: device.serialNumber,
          boardNumber: device.plateNumber,
        },
      },
    }));
  }

  render() {
    const { deviceMovement } = this.state;

    return (
      <Modal
        visible={this.props.visible}
        cancelAction={this.cancel}
        cancelText="Cancelar"
        successAction={this.sendData}
        successText="Guardar"
      >
        <SelectBox
          label="Tipo de Novedad"
          options={this.state.noveltyTypes}
          selectedValue={deviceMovement.noveltyType}
          onChange={this.handleNoveltyTypeChange}
        />
        <View style={styles.sectionTitle}>
          <Checkbox checked={this.state.inSection} onPress={this.toggleInSection} />
          <Text style={styles.sectionTitleText}>Entrada</Text>
        </View>
        {
          this.state.inSection && (
            <React.Fragment>
              <SelectBox
                label="Tipo de Datafono"
                options={this.state.deviceTypes}
                selectedValue={deviceMovement.deviceIn.type}
                onChange={this.handleInDeviceTypeChange}
              />
              <InputText
                label="Placa"
                placeholder="Número de placa del datafono"
                value={deviceMovement.deviceIn.boardNumber}
                onChange={this.handleInDeviceBoardNumberChange}
              />
              <InputText
                label="Serial"
                placeholder="Serial del terminal"
                value={deviceMovement.deviceIn.serial}
                onChange={this.handleInDeviceSerialChange}
              />
            </React.Fragment>
          )
        }
        <View style={styles.sectionTitle}>
          <Checkbox checked={this.state.outSection} onPress={this.toggleOutSection} />
          <Text style={styles.sectionTitleText}>Salida</Text>
        </View>
        {
          this.state.outSection && (
            <React.Fragment>
              <SelectBox label="Serial"
                         selectedValue={this.state.selectedDeviceSerial}
                         onChange={this.handleSerialSelectorChange}
                         options={this.state.devicesSerials}
                         withFilter />
            </React.Fragment>
          )
        }
      </Modal>
    );
  }
}
