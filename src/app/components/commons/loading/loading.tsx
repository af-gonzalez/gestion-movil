import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './loading.styles';
import { Colors } from '../../../../config/constants/styles';

export const Loading: React.SFC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.dark} />
    </View>
  );
};
