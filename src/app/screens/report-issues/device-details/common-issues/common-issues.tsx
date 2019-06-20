import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { InputText, MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../../config/constants/styles';
import { styles } from './common-issues.styles';

type ComponentState = {
  filter: string;
};

export class CommonIssues extends React.Component<{}, ComponentState> {
  mockIssues = [
    'Papel no avanza',
    'Datafono no enciende',
    'Datafono Bloqueado',
    'No Carga Master key',
  ];
  state: ComponentState = {
    filter: '',
  };

  handleFilterChange = (filter: string) => this.setState({
    filter,
  })

  renderIssuesItems() {
    const { filter } = this.state;
    return this.mockIssues.filter(issue => issue.toUpperCase().includes(filter.toUpperCase()))
      .map((issue, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.titleSection}>
            <MaterialIcon name={Icons.circle} color={Colors.red} size={10} />
            <Text style={styles.title}>{issue}</Text>
          </View>
          <Text style={styles.subTitle}>Posible Solución:</Text>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        </View>
      ));
  }

  render() {
    return (
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <InputText
          placeholder="Filtrar"
          rightIcon={Icons.search}
          style={{ marginBottom: 10 }}
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <ScrollView style={{ flex: 1 }}>
          {this.renderIssuesItems()}
        </ScrollView>
      </View>
    );
  }
}
