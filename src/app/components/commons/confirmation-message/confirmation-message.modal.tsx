import * as React from 'react';
import { Text, View } from 'react-native';
import { Modal } from '..';
import { styles } from './confirmation-message.styles';

type ComponentProps = {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export class ConfirmationMessageModal extends React.Component<ComponentProps> {
  modal = React.createRef<any>();

  handleCancelAction = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.props.onCancel();
  }

  handleSuccessAction = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.props.onConfirm();
  }

  render() {
    const { visible, message } = this.props;

    return (
      <Modal visible={visible}
             cancelAction={this.handleCancelAction}
             cancelText="Cancelar"
             successAction={this.handleSuccessAction}
             successText="Confirmar"
             ref={this.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </Modal>
    );
  }
}
