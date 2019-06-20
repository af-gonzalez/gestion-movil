import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcon, Modal } from '@components/commons';
import { connect, MapDispatchToProps } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Colors, Icons } from '../../../../config/constants/styles';
import { styles } from './more-info.styles';

type OwnProps = {
  visible: boolean;
  onClose: () => void;
};

type PropsFromDispatch = {
  navigateToChatSection?: () => void;
};

type ComponentProps = PropsFromDispatch & OwnProps;

const mapDispatchToProps: MapDispatchToProps<PropsFromDispatch, OwnProps> =
  dispatch => ({
    navigateToChatSection: () => dispatch({
      type: NavigationActions.NAVIGATE,
      routeName: 'ChatSection',
    }),
  });

// @ts-ignore
@connect(null, mapDispatchToProps)
export class MoreInfoModal extends React.Component<ComponentProps> {
  modal = React.createRef<any>();

  closeModal = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.props.onClose();
  }

  handleNavigateAction = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.props.navigateToChatSection();
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        cancelAction={this.closeModal}
        cancelText="Cerrar"
        ref={this.modal}
      >
        <Text style={styles.title}>¿Deseas contactarte con nosotros?</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={this.handleNavigateAction}
          >
            <MaterialIcon name={Icons.commentTextAlt} color={Colors.blue2} size={40} />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper}>
            <MaterialIcon name={Icons.phoneInTalk} color={Colors.blue2} size={40} />
            <Text style={styles.buttonText}>CAC</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
