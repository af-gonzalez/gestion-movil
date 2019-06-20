import * as React from 'react';
import {
  Animated,
  Modal as RNModal,
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import { styles } from './modal.styles';
import { Button } from '..';
import { Colors, FontSizes } from '../../../../config/constants/styles';
import { setModalState } from '../../../../store/utils';
import { connect } from 'react-redux';

type OwnProps = {
  visible: boolean;
  hideSuccessAction?: boolean;
  successAction?: () => void;
  successText?: string;
  cancelAction?: () => void
  cancelText?: string;
  disabledScroll?: boolean;
};

type PropsFromDispatch = {
  setModalState?: typeof setModalState;
};

type ComponentProps = PropsFromDispatch & OwnProps;

type ComponentState = {
  isKeyboardOpened: boolean;
};

const { height } = Dimensions.get('window');

// @ts-ignore
@connect(null, { setModalState }, null, { withRef: true })
export class Modal extends React.Component<ComponentProps, ComponentState> {
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;
  modalBoxYPosition = new Animated.Value(-150);
  modalBoxHeight = new Animated.Value(height - 40);
  modalContainerOpacity = new Animated.Value(height - 40);
  state: ComponentState = {
    isKeyboardOpened: false,
  };

  componentDidMount(): void {
    this.keyboardDidShowListener = Keyboard
      .addListener('keyboardWillShow', this.handleKeyboardDidShow);

    this.keyboardDidHideListener = Keyboard
      .addListener('keyboardWillHide', this.handleKeyboardDidHide);
  }

  handleKeyboardDidShow = (event) => {
    const heightValue = height - 40 - event.endCoordinates.height;
    this.setState({ isKeyboardOpened: true });
    Animated.timing(this.modalBoxHeight, {
      toValue: heightValue,
      duration: 200,
    }).start();
  }

  handleKeyboardDidHide = () => {
    this.setState({ isKeyboardOpened: true });
    this.modalBoxHeight.setValue(height - 40);
  }

  componentWillUnmount(): void {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  getContainerStyles() {
    const backgroundColor = this.modalContainerOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)'],
    });

    return [styles.modalContainer, {
      backgroundColor,
    }];
  }

  getModalBoxStyles() {
    return [styles.modalBox, {
      transform: [{ translateY: this.modalBoxYPosition }],
      opacity: this.modalContainerOpacity,
      maxHeight: this.modalBoxHeight,
    }];
  }

  closeModal() {
    return new Promise(resolve =>
      Animated.parallel([
        Animated.timing(this.modalBoxYPosition, {
          toValue: -150,
          duration: 250,
        }),
        Animated.timing(this.modalContainerOpacity, {
          toValue: 0,
          duration: 250,
        }),
      ]).start(() => {
        this.props.setModalState(false);
        resolve();
      }));
  }

  handleModalReady = () => {
    Animated.parallel([
      Animated.timing(this.modalBoxYPosition, {
        toValue: 0,
        duration: 250,
      }),
      Animated.timing(this.modalContainerOpacity, {
        toValue: 1,
        duration: 0,
      }),
    ]).start(() => {
      this.props.setModalState(true);
    });
  }

  render() {
    const {
      visible,
      children,
      cancelAction,
      cancelText,
      successAction,
      successText,
      hideSuccessAction,
    } = this.props;

    return (
      <RNModal
        visible={visible}
        transparent
        animationType="none"
        onShow={this.handleModalReady}
        onRequestClose={() => console.log('close')}
      >
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          disabled={!this.state.isKeyboardOpened}
        >
          <Animated.View style={this.getContainerStyles()}>
            <Animated.View style={this.getModalBoxStyles()}>
              <View style={styles.modalContent}>
                <ScrollView keyboardShouldPersistTaps="handled"
                            scrollEnabled={!this.props.disabledScroll}>
                  {children}
                </ScrollView>
              </View>
              <View style={styles.buttonsContainer}>
                {cancelAction && (
                  <View style={styles.button}>
                    <Button
                      text={cancelText}
                      fontSize={FontSizes.small}
                      backgroundColor={Colors.blue2}
                      modalButton
                      height={40}
                      onPress={cancelAction}
                    />
                  </View>
                )}
                {successAction && !hideSuccessAction && (
                  <View style={styles.button}>
                    <Button
                      fontSize={FontSizes.small}
                      text={successText}
                      modalButton
                      height={40}
                      onPress={successAction}
                    />
                  </View>
                )}
              </View>
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </RNModal>
    );
  }
}
