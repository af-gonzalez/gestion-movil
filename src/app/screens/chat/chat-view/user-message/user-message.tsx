import * as React from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './user-message.styles';
import moment from 'moment';

type ComponentProps = {
  avatarUrl: string;
  messageContent: string;
  createdAt: string
};

export const UserMessage: React.SFC<ComponentProps> =
  ({ avatarUrl, messageContent, createdAt }) => {
    const time = moment(createdAt).format('h:mm a');
    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{messageContent}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarContent}>
            <Image source={{ uri: avatarUrl, cache: 'only-if-cached' }} style={styles.avatar} />
          </View>
        </View>
      </View>
    );
  };
