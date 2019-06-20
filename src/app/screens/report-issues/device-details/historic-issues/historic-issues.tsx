import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../../config/constants/styles';
import { styles } from './historic-issues.styles';

export class HistoricIssues extends React.Component {
  mockIssues = [
    'Papel no avanza',
    'Datafono no enciende',
    'Datafono Bloqueado',
    'Display Malo',
    'No Carga Master Key',
    'Display Malo',
  ];

  render() {
    return (
      <ScrollView>
        {this.mockIssues.map((issue, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionTitle}>Descripción:</Text>
              <Text style={styles.descriptionText}>{issue}</Text>
            </View>
            <View style={styles.descriptionSection}>
              <View style={[styles.descriptionSection, { flex: 1 }]}>
                <Text style={styles.descriptionTitle}># Caso:</Text>
                <Text style={styles.descriptionText}>135187</Text>
              </View>
              <View style={[styles.descriptionSection, { flex: 2 }]}>
                <Text style={styles.descriptionTitle}>Estado:</Text>
                <Text style={styles.descriptionText}>Cerrado</Text>
                <MaterialIcon name={Icons.circle} color={Colors.green} size={10}
                              style={{ marginLeft: 10 }} />
              </View>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>24-10-2018</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}
