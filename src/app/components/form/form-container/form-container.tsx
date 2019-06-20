import * as React from 'react';
import { View, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Subject } from 'rxjs';

type ComponentState = {
  scrollOffset: number;
};

type FocusedInputData = { position: number, height: number };

export type FormContainerContextValue = {
  inputFocusEvent: Subject<FocusedInputData>;
};

const FormContainerContext = React.createContext<FormContainerContextValue>(null);

export const withFormContext = <P extends {}>(Component: React.ComponentType) =>
  class extends React.Component<P> {
    render(): React.ReactNode {
      return (
        <FormContainerContext.Consumer>
          {value => <Component {...this.props} {...value} />}
        </FormContainerContext.Consumer>
      );
    }
  };

export class FormContainer extends React.Component<{}, ComponentState> {
  scrollViewContainer = React.createRef<View>();
  scrollView = React.createRef<ScrollView>();

  onUnmount = new Subject();
  inputFocusEvent = new Subject<FocusedInputData>();

  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: 0,
    };

    this.handleScrollEvent = this.handleScrollEvent.bind(this);
    this.handleInputFocusEvent = this.handleInputFocusEvent.bind(this);
  }

  componentDidMount(): void {
    this.inputFocusEvent.subscribe(this.handleInputFocusEvent);
  }

  componentWillUnmount(): void {
    this.onUnmount.next();
    this.onUnmount.complete();
  }

  handleInputFocusEvent({ position, height }: FocusedInputData): void {
    this.scrollViewContainer.current.measureInWindow((x, y, width, containerHeight) => {
      if (position + height > y + containerHeight) {
        this.scrollView.current.scrollTo({
          y: position - containerHeight - y + height + this.state.scrollOffset,
          animated: true,
        });
      }
    });
  }

  handleScrollEvent(event: NativeSyntheticEvent<NativeScrollEvent>): void {
    this.setState({ scrollOffset: event.nativeEvent.contentOffset.y });
  }

  render(): React.ReactNode {
    const contextValue: FormContainerContextValue = {
      inputFocusEvent: this.inputFocusEvent,
    };

    return (
      <FormContainerContext.Provider value={contextValue}>
        <View ref={this.scrollViewContainer} style={{ flex: 1 }}>
          <ScrollView
            onScroll={this.handleScrollEvent}
            scrollEventThrottle={16}
            ref={this.scrollView}
          >
            {this.props.children}
          </ScrollView>
        </View>
      </FormContainerContext.Provider>
    );
  }
}
