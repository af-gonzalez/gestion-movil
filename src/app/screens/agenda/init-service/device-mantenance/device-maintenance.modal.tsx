import * as React from 'react';
import { InputText, Modal, SelectBox } from '@components/commons';
import { connect, MapStateToProps } from 'react-redux';
import { Subject } from 'rxjs';

type OwnProps = {
  visible: boolean,
  onCancel?: () => void;
  onSuccess?: (maintenance: DeviceMaintenance) => void;
  onEdit?: (maintenance: DeviceMaintenance) => void;
  editionSubject?: Subject<DeviceMaintenance>;
};

type PropsFromState = {
  commerceDevices?: Device[];
  issueTypes?: IssueType[],
};

type ComponentProps = PropsFromState & OwnProps;

type ComponentState = {
  editMode: boolean;
  issueTypes: SelectionBoxOption[],
  devicesSerials: SelectionBoxOption[],
  selectedDeviceSerial: string;
  selectedIssue: string;
  selectedDevicePlateNumber: string;
  selectedDeviceTerminalNumber: string;
};

const mapStateToProps: MapStateToProps<PropsFromState, {}, ReduxStore> =
  ({ devices: { list }, utils: { issueTypes } }) => ({ issueTypes, commerceDevices: list });

// @ts-ignore
@connect(mapStateToProps)
export class DeviceMaintenanceModal extends React.Component<ComponentProps, ComponentState> {
  modal = React.createRef<any>();
  state: ComponentState = {
    editMode: false,
    issueTypes: [],
    selectedIssue: '1',
    devicesSerials: [],
    selectedDeviceSerial: null,
    selectedDevicePlateNumber: null,
    selectedDeviceTerminalNumber: null,
  };

  componentDidMount() {
    const devicesSerials: SelectionBoxOption[] = [];
    const issueTypes: SelectionBoxOption[] = [];
    for (const device of this.props.commerceDevices) {
      devicesSerials.push({
        value: device.id,
        label: device.serialNumber,
      });
    }
    for (const issueType of this.props.issueTypes) {
      issueTypes.push({
        value: issueType.id,
        label: issueType.description,
      });
    }
    this.setState({
      devicesSerials,
      issueTypes,
      selectedIssue: issueTypes[0].value,
      selectedDeviceSerial: devicesSerials[0].value,
      selectedDevicePlateNumber: this.props.commerceDevices[0].plateNumber,
      selectedDeviceTerminalNumber: this.props.commerceDevices[0].terminalNumer,
    });

    if (this.props.editionSubject) {
      this.props.editionSubject.subscribe((mainteance) => {
        this.setState({
          selectedDeviceSerial: mainteance.device.id,
          selectedDevicePlateNumber: mainteance.device.plateNumber,
          selectedDeviceTerminalNumber: mainteance.device.terminalNumer,
          selectedIssue: mainteance.issueType.id,
          editMode: true,
        }, () => console.log('edd', this.state.editMode));
      });
    }
  }

  handleCloseModal = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.setState({ editMode: false });
    this.props.onCancel();
  }

  handleModalSuccess = async () => {
    const {
      selectedIssue, selectedDeviceSerial, selectedDeviceTerminalNumber, selectedDevicePlateNumber,
    } = this.state;
    const { issueTypes, commerceDevices, onSuccess, onEdit } = this.props;
    const device = commerceDevices.find(({ id }) => id === selectedDeviceSerial);
    const issueType = issueTypes.find(({ id }) => id === selectedIssue);
    await this.modal.current.getWrappedInstance().closeModal();
    const deviceMaintenance = {
      device,
      issueType,
    };

    deviceMaintenance.device.terminalNumer = selectedDeviceTerminalNumber;
    deviceMaintenance.device.plateNumber = selectedDevicePlateNumber;

    if (this.state.editMode) {
      onEdit(deviceMaintenance);
      this.setState({ editMode: false });
    } else {
      onSuccess(deviceMaintenance);
    }
  }

  handleSerialSelectorChange = (selectedOption: SelectionBoxOption) => {
    const device = this.props.commerceDevices.find(({ id }) => id === selectedOption.value);
    this.setState({
      selectedDeviceSerial: selectedOption.value,
      selectedDevicePlateNumber: device.plateNumber,
      selectedDeviceTerminalNumber: device.terminalNumer,
    });
  }

  handleDevicePlateNumberChange = (selectedDevicePlateNumber: string) =>
    this.setState({ selectedDevicePlateNumber })

  handleDeviceTerminaNumberChange = (selectedDeviceTerminalNumber: string) =>
    this.setState({ selectedDeviceTerminalNumber });

  handleIssueTypeSelection = (selectedIssue: SelectionBoxOption) =>
    this.setState({ selectedIssue: selectedIssue.value })

  render() {
    const { visible } = this.props;

    return (
      <Modal visible={visible}
             cancelAction={this.handleCloseModal}
             successAction={this.handleModalSuccess}
             cancelText="Cancelar"
             successText="Guardar"
             ref={this.modal}
      >
        <SelectBox label="Serial"
                   selectedValue={this.state.selectedDeviceSerial}
                   onChange={this.handleSerialSelectorChange}
                   options={this.state.devicesSerials}
                   withFilter />

        <InputText label="Placa"
                   placeholder="Numero de placa del dispositivo"
                   value={this.state.selectedDevicePlateNumber}
                   onChange={this.handleDevicePlateNumberChange}
                   style={{ marginBottom: 10 }} />

        <InputText label="Terminal"
                   placeholder="Numero de terminal"
                   value={this.state.selectedDeviceTerminalNumber}
                   onChange={this.handleDeviceTerminaNumberChange}
                   style={{ marginBottom: 10 }} />

        <SelectBox label="Tipo de falla"
                   selectedValue={this.state.selectedIssue}
                   onChange={this.handleIssueTypeSelection}
                   options={this.state.issueTypes}
                   withFilter />
      </Modal>
    );
  }
}
