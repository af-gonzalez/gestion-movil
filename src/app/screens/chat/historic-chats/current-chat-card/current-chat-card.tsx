import * as React from 'react';
import { Animated, Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './current-chat-card.styles';
import { MaterialIcon } from '@components/commons';
import { Colors, Icons } from '@constants/styles';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

interface ComponentProps {
  currentChat: Chat;
}

const infiniteRotation = () => {
  const loadingIconRotation = new Animated.Value(0);

  Animated.loop(Animated.timing(loadingIconRotation, {
    toValue: 1,
    duration: 2000,
  })).start();

  return loadingIconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
};

const CurrentChatCard: React.FC<ComponentProps & NavigationInjectedProps> =
  (({ currentChat, navigation }) => {
    const { active, user, supportUser, id } = currentChat;

    function openChat() {
      navigation.navigate('ChatView', { chatId: id, userId: user.id });
    }

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          {!active ? (
            <React.Fragment>
              <View style={styles.iconContainer}>
                <Animated.View style={{ transform: [{ rotate: infiniteRotation() }] }}>
                  <MaterialIcon name={Icons.refresh} color={Colors.blue} size={60} />
                </Animated.View>
              </View>
              <View style={styles.loadingDescription}>
                <Text style={styles.loadingTitle}>Iniciando nuevo chat</Text>
                <Text style={styles.loadingMessage}>En un momento uno de nuestros agentes le
                  atendera</Text>
              </View>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View style={styles.iconContainer}>
                <Image source={{ uri: supportUser.profileImage }}
                       style={styles.userImage} />
              </View>
              <View style={styles.loadingDescription}>
                <Text style={styles.loadingTitle}>Asesor</Text>
                <Text style={styles.userName}>{supportUser.name}</Text>
                <Text style={styles.userName}>{supportUser.lastname}</Text>
              </View>
              <TouchableOpacity
                style={styles.linkContainer}
                onPress={openChat}
              >
                <MaterialIcon name={Icons.comments} color={Colors.white} size={24} />
                <Text style={styles.linkMessage}>Ver Mensajes</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
        </View>
      </View>
    );
  });

export default withNavigation(CurrentChatCard);
