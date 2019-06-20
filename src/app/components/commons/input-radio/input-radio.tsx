import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { Colors, Icons } from '../../../../config/constants/styles';
import { MaterialIcon } from '..';

type ComponentProps = {
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const InputRadio: React.SFC<ComponentProps> = ({ selected, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    {selected ?
      <MaterialIcon name={Icons.dotCircle} size={24} color={Colors.complementary} /> :
      <MaterialIcon name={Icons.circleOutline} size={24} color={Colors.dark} />}
  </TouchableOpacity>
);
