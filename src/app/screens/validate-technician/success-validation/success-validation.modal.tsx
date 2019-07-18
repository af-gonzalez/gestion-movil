import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { DividedInfo, Modal } from '@components/commons';
import { styles } from './success-validation.styles';
import { Colors, FontSizes } from '../../../../config/constants/styles';

type ComponentProps = {
  visible: boolean;
  onClose: () => void;
  user: User;
};

export class SuccessValidationModal extends React.Component<ComponentProps> {
  modal = React.createRef<any>();

  handleCloseAction = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.props.onClose();
  }

  render() {
    const { user } = this.props;
    return (
      <Modal
        visible={this.props.visible}
        successAction={this.handleCloseAction}
        successText="Finalizar"
        ref={this.modal}
      >
        {user && (
          <View style={styles.modalContent}>
            <Image
              style={styles.avatarImage}
              source={{ uri: user.profileImage }} />
            <Text style={styles.name}>{user.fullname}</Text>
            <View style={{
              alignSelf: 'stretch',
              marginHorizontal: 10,
              height: 1,
              backgroundColor: Colors.complementary,
              marginVertical: 5,
            }} />
            <DividedInfo
              title="Cargo"
              description="Operador tecnico"
              fontSize={FontSizes.small}
            />
          </View>
        )
        }
      </Modal>
    );
  }
}
