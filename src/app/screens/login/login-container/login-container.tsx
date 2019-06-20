import * as React from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';

import { styles } from './login-container.styles';
import { Colors } from '@constants/styles';

const { width, height } = Dimensions.get('window');

export class LoginContainer extends React.Component {
  imageHeight = new Animated.Value(150);
  keyboardWillShowListener: any;
  keyboardWillHideListener: any;

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard
      .addListener(
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
        this.handleKeyboardWillShow,
      );

    this.keyboardWillHideListener = Keyboard
      .addListener(
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
        this.handleKeyboardWillHide,
      );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  handleKeyboardWillShow = () => {
    Animated.timing(this.imageHeight, {
      toValue: 100,
      duration: 220,
    }).start();
  }

  handleKeyboardWillHide = () => {
    Animated.timing(this.imageHeight, {
      toValue: 150,
      duration: 220,
    }).start();
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={{
          height,
          width,
          alignItems: 'center',
          justifyContent: 'center',
        }}

        >
          <LinearGradient colors={[Colors.dark, Colors.white, Colors.white]}
                          style={styles.container}
          >
            <React.Fragment>
              <StatusBar barStyle="light-content" />
              <View style={styles.formContainer}>
                <Animated.Image source={require('../../../../../assets/redebanLogo.png')}
                                style={{
                                  marginBottom: 30, width: '100%',
                                  height: this.imageHeight,
                                  padding: 10,
                                  paddingBottom: 10,
                                  zIndex: 3,
                                }}
                                resizeMode="contain"
                />
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                  {this.props.children}
                </View>
              </View>
            </React.Fragment>

          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
