/*
 @autor: Andres
 sdasd
 */

import * as React from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInput,
  TextInputContentSizeChangeEventData,
  View,
  ViewStyle,
} from 'react-native';

import { styles } from './input-text.styles';
import { MaterialIcon } from '../../commons';
import { Colors, Icons } from '@constants/styles';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FormContainerContextValue, withFormContext } from '@components/form/form-container';
import { ContainerContextValue, withContainer } from '@components/layout/container';
import { FieldProps } from 'formik';

type OwnProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: (py: number) => void;
  onBlur?: (e: any) => void;
  placeholder?: string;
  textArea?: boolean;
  expandable?: boolean;
  rightIcon?: Icons;
  leftIcon?: Icons;
  style?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  labelIcon?: Icons;
  errorMessage?: string;
  autoCorrect?: boolean;
};

type ComponentProps = OwnProps & FormContainerContextValue & ContainerContextValue & FieldProps;

type ComponentState = {
  boxHeight: number;
};

// clase
class InputText extends React.Component<ComponentProps, ComponentState> {
  textInput = React.createRef<TextInput>();
  input = React.createRef<View>();
  onUnmount = new Subject<void>();
  focusedInput = new Subject<void>();

  constructor(props: ComponentProps) {
    super(props);

    this.state = {
      boxHeight: props.textArea && 100 || 20,
    };

    this.subscribeToContainerCollapsedEvent = this.subscribeToContainerCollapsedEvent.bind(this);
    this.handleContentSizeChange = this.handleContentSizeChange.bind(this);
  }

  componentDidMount(): void {
    this.subscribeToContainerCollapsedEvent();
  }

  componentWillUnmount(): void {
    this.onUnmount.next();
    this.onUnmount.complete();
  }

  subscribeToContainerCollapsedEvent(): void {
    const { containerCollapsedEvent, inputFocusEvent } = this.props;
    if (containerCollapsedEvent && inputFocusEvent) {
      containerCollapsedEvent
        .pipe(
          takeUntil(this.onUnmount),
          filter(() => this.textInput.current.isFocused()))
        .subscribe(() => this.input.current.measureInWindow((x, y, width, height) =>
          inputFocusEvent.next({
            height,
            position: y,
          })));
    }
  }

  handleContentSizeChange(event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) {
    if (this.props.expandable) {
      this.setState({ boxHeight: event.nativeEvent.contentSize.height });
    }
  }

  render() {
    const {
      value,
      onChange,
      label,
      placeholder,
      textArea,
      expandable,
      rightIcon,
      leftIcon,
      style,
      boxStyle,
      labelIcon,
      onBlur,
      errorMessage,
      autoCorrect,
    } = this.props;

    return (
      <View style={[styles.container, style]} ref={this.input}>
        {label && (
          <View style={styles.labelSection}>
            {labelIcon && (
              <MaterialIcon
                name={labelIcon}
                color={Colors.dark}
                style={{ marginRight: 5 }}
                size={20}
              />
            )}
            <View style={styles.labelTextContainer}>
              <Text style={styles.labelText}>{label}</Text>
            </View>
          </View>
        )}
        <View style={[styles.inputBox, boxStyle]}>
          {leftIcon && (
            <MaterialIcon name={leftIcon} color={Colors.dark} style={{ marginRight: 10 }} />
          )}
          <TextInput
            style={[styles.input, { height: this.state.boxHeight }]}
            onContentSizeChange={this.handleContentSizeChange}
            autoCorrect={autoCorrect || false}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#708594"
            multiline={textArea || expandable}
            clearButtonMode="while-editing"
            onFocus={() => this.focusedInput.next()}
            onBlur={onBlur}
            secureTextEntry={this.props.isPassword}
            underlineColorAndroid="rgba(0,0,0,0)"
            ref={this.textInput}
          />
          {rightIcon && (
            <MaterialIcon name={rightIcon} color={Colors.dark} />
          )}
        </View>
        {errorMessage && (
          <View style={styles.errorMessageContainer}>
            <MaterialIcon name={Icons.alertCircle} size={10} color={Colors.red} />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default withFormContext<OwnProps>(withContainer(InputText));
