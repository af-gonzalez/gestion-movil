import * as React from 'react';
import { Text, View } from 'react-native';

import { styles } from './photographic-evidence.styles';
import { MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../../config/constants/styles';

export const PhotograpicEvidence: React.SFC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <MaterialIcon name={Icons.camera} size={40} color={Colors.white}/>
      </View>
      <View style={styles.linkSection}>
        <MaterialIcon name={Icons.cameraAdd} size={24} color={Colors.blue}/>
        <Text style={styles.linkSectionText}>Evidencia Fotografica</Text>
      </View>
    </View>
  );
};
