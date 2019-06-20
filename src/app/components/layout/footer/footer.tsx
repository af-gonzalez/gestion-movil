import * as React from 'react';
import { Animated, Dimensions, RegisteredStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { ContainerContextValue, withContainer } from '../container';

const { width } = Dimensions.get('window');

type ComponentStyles = {
  footerView: ViewStyle;
};

type OwnProps = {
  style?: ViewStyle | RegisteredStyle<ViewStyle>;
};

const dim = Dimensions.get('window');

function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

type ComponentProps = OwnProps & ContainerContextValue;

class Footer extends React.Component<ComponentProps> {
  asd = React.createRef<View>();
  footerOpacity = new Animated.Value(1);

  componentDidMount(): void {
    const { containerExpandedEvent, containerWillCollapseEvent } = this.props;

    containerWillCollapseEvent.subscribe(() => {
      this.footerOpacity.setValue(0);
    });

    containerExpandedEvent.subscribe(() => {
      Animated.timing(this.footerOpacity, {
        toValue: 1,
        duration: 100,
      }).start();
    });
  }

  render(): React.ReactNode {
    const { children, style } = this.props;

    return (
      <Animated.View style={[styles.footerView, {
        opacity: this.footerOpacity,
      }]}>
        <View
          style={[style, { padding: 10 }]} ref={this.asd}
          onLayout={({ nativeEvent: { layout: { height } } }) =>
            this.props.setFooterHeight(height)}>
          {children}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create<ComponentStyles>({
  footerView: {
    width,
    alignSelf: 'stretch',
    bottom: 0,
    paddingBottom: isIPhoneXSize(dim) && 20 || 0,
  },
});

export default withContainer<OwnProps>(Footer);
