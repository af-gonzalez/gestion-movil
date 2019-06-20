import * as React from 'react';
import { Text, View } from 'react-native';

import { styles } from './divided-info.styles';

type ComponentProps = {
  fontSize: number;
  title?: string;
  description: string;
  span?: string;
};

export const DividedInfo: React.SFC<ComponentProps> = ({ fontSize, title, description, span }) => {
  return (
    <View style={styles.itemField}>
      <View style={styles.itemFieldTitleContainer}>
        <Text style={[styles.itemFieldTitle, { fontSize }]}>{title}</Text>
      </View>
      <View style={styles.verticalDivisor} />
      <View style={styles.itemFieldDescriptionContainer}>
        <Text style={[styles.itemFieldDescription, { fontSize }]}>{description} </Text>
        <Text style={[styles.itemFieldDescriptionSpan, { fontSize }]}>{span}</Text>
      </View>
    </View>
  );
};
