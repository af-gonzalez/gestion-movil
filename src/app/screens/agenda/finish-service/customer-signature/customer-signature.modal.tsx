import * as React from 'react';
import { Text, View } from 'react-native';
import { Button, Modal } from '@components/commons';
import ExpoPixi from 'expo-pixi';

import { styles } from './customer-signature.styles';
import { FontSizes, Icons } from '../../../../../config/constants/styles';

type ComponentProps = {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
};

export class CustomerSignatureModal extends React.Component<ComponentProps> {
  sketch = React.createRef<any>();

  cancel = () => {
    this.props.onCancel();
  }

  sendConfirmation = () => {
    this.props.onSuccess();
  }

  handleUndoAction = () => {
    this.sketch.current.undo();
  }

  render() {
    const color = 0x0000ff;
    const width = 5;
    const alpha = 0.5;

    return (
      <Modal
        visible={this.props.visible}
        cancelAction={this.cancel}
        cancelText="Cancelar"
        successAction={this.sendConfirmation}
        successText="Confirmar"
        disabledScroll
      >
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Firma Administrador
            </Text>
          </View>
          <ExpoPixi.Sketch
            style={styles.signatureBox}
            strokeColor={color}
            strokeWidth={width}
            strokeAlpha={alpha}
            ref={this.sketch}
          />

          <Button text="Deshacer"
                  icon={Icons.undo}
                  iconSize={20}
                  height={30}
                  fontSize={FontSizes.smaller}
                  width={120}
                  style={{ alignSelf: 'center', marginTop: 10}}
                  onPress={this.handleUndoAction}
          />
        </View>
      </Modal>
    );
  }
};
