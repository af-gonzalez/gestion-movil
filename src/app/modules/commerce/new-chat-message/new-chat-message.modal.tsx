import * as React from 'react';
import { Modal } from '@components/commons';
import { Text, View } from 'react-native';
import { styles } from './new-chat-message.styles';

interface ComponentProps {
  visible: boolean;
  supportUserName: string;
  message: string;

  onConfirm(): void;

  onCancel(): void;
}

export class NewChatMessageModal extends React.PureComponent<ComponentProps> {
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
    const { visible, supportUserName, message } = this.props;

    return (
      <Modal visible={visible}
             cancelAction={this.handleCancelAction}
             cancelText="Cerrar"
             successAction={this.handleSuccessAction}
             successText="Responder"
             ref={this.modal}
      >
        <View>
          <Text style={styles.title}>Tienes un nuevo mensaje.</Text>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{supportUserName}:</Text>
          </View>
          <View style={styles.divisor} />
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}
