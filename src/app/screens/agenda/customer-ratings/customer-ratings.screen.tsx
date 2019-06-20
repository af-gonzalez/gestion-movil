import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { Container, Content, Header } from '@components/layout';
import { styles } from './customer-ratings.styles';
import { MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../config/constants/styles';
import { NavigationInjectedProps } from 'react-navigation';

type ComponentProps = Partial<NavigationInjectedProps>;

export const CustomerRatingsScreen: React.SFC<ComponentProps> = (props) => {
  const { commerceName } = props.navigation.state.params;

  return (
    <Container>
      <Header title="Calificaciones" />
      <Content>
        <Text style={styles.commerceName}>{commerceName}</Text>
        <View style={styles.ratingWrapper}>
          <MaterialIcon name={Icons.star} color={Colors.yellow} size={30}/>
          <MaterialIcon name={Icons.star} color={Colors.yellow} size={30}/>
          <MaterialIcon name={Icons.star} color={Colors.yellow} size={30}/>
          <MaterialIcon name={Icons.star} color={Colors.yellow} size={30}/>
          <MaterialIcon name={Icons.star} color={Colors.gray} size={30}/>
        </View>
        <ScrollView>
          <View style={styles.commentContainer}>
            <Text style={styles.commentTime}>24-10-2018</Text>
            <Text style={styles.commentText}>
              printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </Text>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.commentTime}>24-10-2018</Text>
            <Text style={styles.commentText}>
              printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </Text>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.commentTime}>24-10-2018</Text>
            <Text style={styles.commentText}>
              printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </Text>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.commentTime}>24-10-2018</Text>
            <Text style={styles.commentText}>
              printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </Text>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.commentTime}>24-10-2018</Text>
            <Text style={styles.commentText}>
              printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </Text>
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
};
