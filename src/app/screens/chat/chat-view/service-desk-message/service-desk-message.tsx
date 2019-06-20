import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './service-desk-message.styles';
import moment from 'moment';

type ComponentProps = {
  avatarUrl: string;
  messageContent: string;
  userName: string;
  createdAt: string;
};

export const ServiceDeskMesage: React.SFC<ComponentProps> =
  ({ avatarUrl, messageContent, userName, createdAt }) => {
    const time = moment(createdAt).format('h:mm a');
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarContent}>
            <Image source={{ uri: avatarUrl, cache: 'only-if-cached' }} style={styles.avatar} />
          </View>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.userName}>{userName} :</Text>
          <Text style={styles.messageContent}>{messageContent}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    );
  };
