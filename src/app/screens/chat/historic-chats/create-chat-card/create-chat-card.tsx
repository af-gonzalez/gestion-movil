import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcon } from '@components/commons';
import { Colors, Icons } from '@constants/styles';
import { styles } from './create-chat-card.styles';

interface ComponentProps {
  onPress: () => void;
}

export const CreateChatCard: React.FC<ComponentProps> = ({ onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.messageSection}>
        <Text style={styles.message}>Si deseas comunicarte con la mesa de ayuda inicia un nuevo
          chat.</Text>
      </View>
      <TouchableOpacity style={styles.buttonSection} onPress={onPress}>
        <MaterialIcon name={Icons.plus} size={30} color={Colors.white} />
        <Text style={styles.buttonText}>Nuevo Chat</Text>
      </TouchableOpacity>
    </View>
  );
};
