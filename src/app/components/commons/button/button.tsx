import * as React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { Colors, Icons } from '../../../../config/constants/styles';
import { buttonStyles } from './button.styles';
import { MaterialIcon } from '..';

type OwnProps = {
  backgroundColor?: string;
  icon?: Icons;
  textColor?: string;
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  iconSize?: number;
  text: string;
  onPress?: (event: GestureResponderEvent) => void,
  paddingHorizontal?: number;
  disabled?: boolean;
  modalButton?: boolean;
  style?: StyleProp<ViewStyle>;
  reversed?: boolean;
  withLoading?: boolean;
  loading?: boolean;
};

type PropsFromState = {
  loading?: boolean;
};

type ComponentProps = PropsFromState & OwnProps;

export class Button extends React.Component<ComponentProps> {
  static defaultProps = {
    backgroundColor: Colors.dark,
    fontSize: 18,
    iconSize: 30,
    textColor: Colors.white,
    width: '100%',
    height: 55,
    paddingHorizontal: 15,
    disabled: false,
  };

  render() {
    const {
      height,
      width,
      textColor,
      backgroundColor,
      fontSize,
      icon,
      iconSize,
      text,
      onPress,
      paddingHorizontal,
      disabled,
      modalButton,
      style,
      reversed,
      withLoading,
      loading,
    } = this.props;

    const buttonStyle: StyleProp<ViewStyle> = [
      {
        height,
        width,
        backgroundColor,
        paddingHorizontal,
        flexDirection: reversed ? 'row-reverse' : 'row',
        justifyContent: icon ? 'space-between' : 'center',
        borderRadius: modalButton ? 0 : 5,
      },
      buttonStyles.buttonContainer,
    ];

    return (
      <TouchableOpacity
        style={[buttonStyle, style, { opacity: disabled ? 0.8 : 1 }]}
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        {(icon || !loading) && (
          <Text style={[{ fontSize, color: textColor }, buttonStyles.buttonText]}>
            {text}
          </Text>
        )}
        {
          (withLoading && loading && <ActivityIndicator size="small" color={Colors.white} />) ||
          icon && <MaterialIcon name={icon} color={textColor} size={iconSize} />
        }
      </TouchableOpacity>
    );
  }
}
