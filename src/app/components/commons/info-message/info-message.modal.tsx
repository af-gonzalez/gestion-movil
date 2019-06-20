import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcon, Modal } from '..';

import { styles } from './info-message.styles';
import { Colors, Icons } from '../../../../config/constants/styles';

type ComponentProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export class InfoMessageModal extends React.Component<ComponentProps> {
  modal = React.createRef<any>();

  handleCloseEvent = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.props.onClose();
  }

  render() {
    return (
      <Modal visible={this.props.visible}
             ref={this.modal}
             cancelAction={this.handleCloseEvent}
             cancelText="Cerrar"
      >
        <View style={styles.modalContent}>
          <Text style={styles.message}>
            {this.props.message}
          </Text>
          <TouchableOpacity style={styles.closeButtonContainer}
                            onPress={this.handleCloseEvent}
          >
            <MaterialIcon name={Icons.close} color={Colors.complementary} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
