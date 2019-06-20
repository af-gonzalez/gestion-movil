import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './expired-chat-card.styles';
import moment from 'moment';
import 'moment/locale/es';

interface ComponentProps {
  expiredChat: Chat;
}

export const ExpiredChatCard: React.FC<ComponentProps> = ({ expiredChat }) => {
  const createdAt = moment(expiredChat.createdAt).format('DD [de] MMMM h:mm a');
  const expiredAt = moment(expiredChat.expiredAt).fromNow();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageSection}>
        <Image
          source={{ uri: expiredChat.supportUser.profileImage }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.supportUserName}>{expiredChat.supportUser.fullname}</Text>
        <View style={styles.timeRow}>
          <Text style={styles.timeTitle}>Creado:</Text>
          <Text style={styles.timeDesc}>{createdAt}</Text>
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeTitle}>Finalizado:</Text>
          <Text style={styles.timeDesc}>{expiredAt}</Text>
        </View>
      </View>
    </View>
  );
};
