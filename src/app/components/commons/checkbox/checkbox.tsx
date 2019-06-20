import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { Colors, Icons } from '../../../../config/constants/styles';
import { MaterialIcon } from '..';

type ComponentProps = {
  checked: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Checkbox: React.SFC<ComponentProps> = ({ checked, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    {checked ?
      <MaterialIcon name={Icons.squareCheck} size={24} color={Colors.complementary} /> :
      <MaterialIcon name={Icons.squareOutline} size={24} color={Colors.dark} />}
  </TouchableOpacity>
);
