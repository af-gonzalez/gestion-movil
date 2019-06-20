import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { toggleImagePicker } from '../../../../store/modals';
import { connect, MapStateToProps } from 'react-redux';
import { MaterialIcon, Modal } from '..';
import { Colors, Icons } from '../../../../config/constants/styles';
import { styles } from './image-picker.styles';
import { ImagePicker } from 'expo';

type PropsFromState = {
  showImagePicker?: boolean;
};

type PropsFromDispatch = {
  toggleImagePicker?: typeof toggleImagePicker;
};

type OwnProps = {
  onSelectImage: (imageUri: string) => void;
};

type ComponentProps = PropsFromState & PropsFromDispatch & OwnProps;

type ComponentState = {
  selectedImage: string;
};

const mapStateToProps: MapStateToProps<PropsFromState, OwnProps, ReduxStore> =
  ({ modals: { showImagePicker } }) => ({ showImagePicker });

// @ts-ignore
@connect(mapStateToProps, { toggleImagePicker })
export class ImagePickerModal extends React.Component<ComponentProps, ComponentState> {
  modal = React.createRef<any>();
  state: ComponentState = {
    selectedImage: null,
  };

  handleCancelAction = async () => {
    await this.modal.current.getWrappedInstance().closeModal();
    this.props.toggleImagePicker();
  }

  handleSuccessAction = async () => {
    await this.handleCancelAction();
    this.props.onSelectImage(this.state.selectedImage);
  }

  selectCameraRollImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    if (!result.cancelled) {
      this.setState({ selectedImage: (result as any).uri });
    }
  }

  selectCameraImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      this.setState({ selectedImage: (result as any).uri });
    }
  }

  render() {
    const { selectedImage } = this.state;

    return (
      <Modal
        visible={this.props.showImagePicker}
        cancelAction={this.handleCancelAction}
        successAction={this.handleSuccessAction}
        cancelText="Cancelar"
        successText="Finalizar"
        ref={this.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.imageSection}>
            {
              selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 120, height: 120 }}
                />
              ) : (
                <View style={styles.defaultImage}>
                  <MaterialIcon name={Icons.camera} color={Colors.white} size={40} />
                </View>
              )
            }
          </View>
          <View style={styles.buttonsSection}>
            <TouchableOpacity
              style={styles.touchableLink}
              onPress={this.selectCameraRollImage}
            >
              <MaterialIcon name={Icons.collectionImageFolder} color={Colors.dark} />
              <Text style={styles.linkText}>Seleccionar de la galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableLink}
              onPress={this.selectCameraImage}
            >
              <MaterialIcon name={Icons.cameraAdd} color={Colors.dark} />
              <Text style={styles.linkText}>Tomar Fotografia</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
