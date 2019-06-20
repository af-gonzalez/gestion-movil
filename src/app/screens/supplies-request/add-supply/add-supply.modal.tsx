import * as React from 'react';
import { View } from 'react-native';
import { addSupply } from '../../../../store/supplies';
import { connect, MapStateToProps } from 'react-redux';
import { Modal, SelectBox } from '@components/commons';

type OwnProps = {
  visible: boolean;
  onClose: () => void;
};

type PropsFromState = {
  suppliesTypes?: SupplyType[];
};

type PropsFromDispatch = {
  addSupply?: typeof addSupply;
};

type ComponentProps = PropsFromState & PropsFromDispatch & OwnProps;

type ComponentState = {
  suppliesReferences: SupplyReference[];
  suppliesTypesOptions: SelectionBoxOption[];
  suppliesReferencesOptions: SelectionBoxOption[];
  selectedSupplyType: number;
  selectedSupplyReference: number;
};

const mapStateToProps: MapStateToProps<PropsFromState, OwnProps, ReduxStore> =
  ({ supplies: { types } }) => ({ suppliesTypes: types });

// @ts-ignore
@connect(mapStateToProps, { addSupply })
export class AddSupplyModal extends React.Component<ComponentProps, ComponentState> {
  modal = React.createRef<any>();
  state: ComponentState = {
    suppliesReferences: [],
    suppliesTypesOptions: [],
    selectedSupplyType: null,
    suppliesReferencesOptions: [],
    selectedSupplyReference: null,
  };

  componentDidMount() {
    const { suppliesTypes } = this.props;
    const suppliesTypesOptions: SelectionBoxOption[] = [];
    const suppliesReferencesOptions: SelectionBoxOption[] = [];
    for (const supplyType of suppliesTypes) {
      suppliesTypesOptions.push({
        value: supplyType.id,
        label: supplyType.name,
      });
    }

    for (const supplyReference of suppliesTypes[0].references) {
      suppliesReferencesOptions.push({
        value: supplyReference.id,
        label: supplyReference.name,
      });
    }

    this.setState({
      suppliesTypesOptions,
      suppliesReferencesOptions,
      selectedSupplyType: suppliesTypesOptions[0].value,
      selectedSupplyReference: suppliesReferencesOptions[0].value,
    });
  }

  handleCloseAction = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.props.onClose();
  }

  handleSaveAction = async () => {
    const { selectedSupplyType, selectedSupplyReference } = this.state;
    const { onClose, addSupply } = this.props;
    const supplyType = this.props.suppliesTypes.find(({ id }) => id === selectedSupplyType);
    const supplyReference = supplyType.references.find(({ id }) => id === selectedSupplyReference);
    addSupply({ item: { ...supplyReference }, amount: 1 });
    await this.modal.current.getWrappedInstance().closeModal();
    onClose();
  }

  handleSupplyTypeChange = ({ value }: SelectionBoxOption) => {
    const supplyType = this.props.suppliesTypes.find(({ id }) => id === value);
    const suppliesReferencesOptions: SelectionBoxOption[] = [];
    for (const supplyReference of supplyType.references) {
      suppliesReferencesOptions.push({
        value: supplyReference.id,
        label: supplyReference.name,
      });
    }

    this.setState({
      suppliesReferencesOptions,
      selectedSupplyType: supplyType.id,
      selectedSupplyReference: suppliesReferencesOptions[0].value,
    });
  }

  handleSupplyReferenceChange = ({ value }: SelectionBoxOption) => this.setState({
    selectedSupplyReference: value,
  })

  render() {
    return (
      <Modal
        visible={this.props.visible}
        ref={this.modal}
        cancelAction={this.handleCloseAction}
        cancelText="Cancelar"
        successAction={this.handleSaveAction}
        successText="Guardar"
      >
        <View>
          <SelectBox
            label="Tipo de insumo"
            selectedValue={this.state.selectedSupplyType}
            onChange={this.handleSupplyTypeChange}
            options={this.state.suppliesTypesOptions}
          />
          <SelectBox
            label="Referencia"
            selectedValue={this.state.selectedSupplyReference}
            onChange={this.handleSupplyReferenceChange}
            options={this.state.suppliesReferencesOptions}
          />
        </View>
      </Modal>
    );
  }
}
