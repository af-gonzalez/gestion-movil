import * as React from 'react';
import { Text, TextStyle } from 'react-native';
import { Icons } from '../../../../config/constants/styles';

type ComponentProps = {
  name: Icons;
  size?: number;
  color: string;
  style?: TextStyle;
};

export const MaterialIcon: React.SFC<ComponentProps> = ({ name, size: fontSize, color, style }) => {
  return (
    <Text style={[
      {
        color,
        fontSize,
        fontFamily: 'Material',
        height: fontSize,
        lineHeight: fontSize,
      },
      style,
    ]}
    >
      {name}
    </Text>
  );
};

MaterialIcon.defaultProps = {
  size: 24,
};

