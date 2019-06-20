import * as React from 'react';
import { InputText, Modal } from '@components/commons';

type ComponentProps = {
  visible: boolean;
  onCancel: () => void;
  onSave: (data: SecuritySealChange) => void
};

export class SecuritySealFormModal extends React.Component<ComponentProps> {

  cancel = () => {
    this.props.onCancel();
  }

  sendData = () => {
    this.props.onSave(null);
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        cancelAction={this.cancel}
        cancelText="Cancelar"
        successAction={this.sendData}
        successText="Guardar"
      >
          <InputText
            label="Número Actual"
            placeholder="Número actual del sello"
          />
          <InputText
            label="Número Nuevo"
            placeholder="Número del nuevo sello"
          />
      </Modal>
    );
  }
}
