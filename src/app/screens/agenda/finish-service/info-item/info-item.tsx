import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { infoItemStyles } from './info-item.styles';
import { MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../../config/constants/styles';

type ComponentProps = {
  onEdit?: () => void;
  onRemove?: () => void;
};

export const InfoItem: React.SFC<ComponentProps> = ({ onEdit, onRemove, children }) => {
  return (
    <View style={infoItemStyles.container}>
      {children}
      <View style={infoItemStyles.buttonsContainer}>
        <TouchableOpacity
          onPress={onEdit}
          style={[infoItemStyles.actionButton, infoItemStyles.editButton]}
        >
          <MaterialIcon name={Icons.edit} size={18} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRemove}
          style={[infoItemStyles.actionButton, infoItemStyles.removeButton]}
        >
          <MaterialIcon name={Icons.delete} size={18} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
