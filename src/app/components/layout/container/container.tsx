import * as React from 'react';
import { Animated, Dimensions, Keyboard } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { Subject } from 'rxjs';

export type ContainerContextValue = {
  containerWillCollapseEvent: Subject<void>;
  containerCollapsedEvent: Subject<void>;
  containerExpandedEvent: Subject<void>;
  setFooterHeight: (height: number) => void;
};

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    width,
    backgroundColor: '#F8F6F6',
    position: 'relative',
  },
};

type PropsFromState = {
  modalOpened?: boolean;
};

const mapStateToProps: MapStateToProps<PropsFromState, {}, ReduxStore> =
  ({ utils: { modalOpened } }) => ({ modalOpened });

export const ContainerContext = React.createContext<ContainerContextValue>(null);

type ComponentState = {
  footerHeight: number;
};

class Container extends React.Component<PropsFromState, ComponentState> {
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  containerMaxHeight = new Animated.Value(height);
  containerWillCollapseEvent = new Subject<void>();
  containerCollapsedEvent = new Subject<void>();
  containerExpandedEvent = new Subject<void>();

  constructor(props) {
    super(props);
    this.state = {
      footerHeight: 0,
    };

    this.handleKeyboardDidHide = this.handleKeyboardDidHide.bind(this);
    this.handleKeyboardDidShow = this.handleKeyboardDidShow.bind(this);
    this.setFooterHeight = this.setFooterHeight.bind(this);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard
      .addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideListener = Keyboard
      .addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount(): void {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleKeyboardDidShow(event) {
    const { modalOpened } = this.props;
    if (!modalOpened) {
      this.containerWillCollapseEvent.next();
      Animated.timing(this.containerMaxHeight, {
        toValue: height - event.endCoordinates.height + this.state.footerHeight,
        duration: 100,
      }).start(() => this.containerCollapsedEvent.next());
    }
  }

  handleKeyboardDidHide() {
    const { modalOpened } = this.props;
    if (!modalOpened) {
      Animated.timing(this.containerMaxHeight, {
        toValue: height,
        duration: 150,
      }).start(() => this.containerExpandedEvent.next());
    }
  }

  setFooterHeight(footerHeight) {
    this.setState({ footerHeight });
  }

  render() {
    const contextValue: ContainerContextValue = {
      containerWillCollapseEvent: this.containerWillCollapseEvent,
      containerCollapsedEvent: this.containerCollapsedEvent,
      containerExpandedEvent: this.containerExpandedEvent,
      setFooterHeight: this.setFooterHeight,
    };

    return (
      <Animated.View style={[styles.container, { height: this.containerMaxHeight }]}>
        <ContainerContext.Provider value={contextValue}>
          {this.props.children}
        </ContainerContext.Provider>
      </Animated.View>
    );
  }
}

export default connect(mapStateToProps)(Container);

export const withContainer =
  <P extends {}>(Component: React.ComponentType<P>) =>
    class extends React.Component<P> {
      render(): React.ReactNode {
        return (
          <ContainerContext.Consumer>
            {value => <Component {...value} {...this.props} />}
          </ContainerContext.Consumer>
        );
      }
    };
