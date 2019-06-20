import * as React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
  LayoutChangeEvent, StyleProp,
} from 'react-native';
import { Loading } from '../../commons';

type ComponentStyles = {
  contentView: ViewStyle;
};

type ComponentProps = {
  loadingContent?: boolean;
  style?: StyleProp<ViewStyle>;
};

type ComponentState = {
  isKeyboarOpened: boolean;
};

export class Content extends React.Component<ComponentProps, ComponentState> {
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;
  state: ComponentState = {
    isKeyboarOpened: false,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => this.setState({ isKeyboarOpened: true }),
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => this.setState({ isKeyboarOpened: false }),
    );
  }

  handleContentViewLayout = (event: LayoutChangeEvent) => {
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const { children, loadingContent } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        disabled={!this.state.isKeyboarOpened}
      >
        <View
          style={[styles.contentView, this.props.style]}
          onLayout={this.handleContentViewLayout}
        >
          {
            loadingContent ? <Loading /> : children
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create<ComponentStyles>({
  contentView: {
    flex: 1,
    paddingVertical: 10,
    position: 'relative',
  },
});
