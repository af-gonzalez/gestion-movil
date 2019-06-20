import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Content, Header } from '@components/layout';
import { styles } from './reports-list.styles';
import { MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../config/constants/styles';
import { NavigationInjectedProps } from 'react-navigation';

type ComponentProps = NavigationInjectedProps;

export class ReportsListScreen extends React.Component<ComponentProps> {
  openExecutiveReport = () => this.props.navigation.navigate('ExecutiveReport');

  render() {
    return (
      <Container>
        <Header title="Información Transaccional" mainView />
        <Content>
          <View style={styles.menuItemContainer}>
            <MaterialIcon name={Icons.chart} color={Colors.dark} />
            <Text style={styles.title}>Reporte ejecutivo</Text>
            <View style={styles.linkContainer}>
              <TouchableOpacity
                onPress={this.openExecutiveReport}
                style={styles.linkTouchable}>
                <MaterialIcon name={Icons.chevronRight} size={30} color={Colors.complementary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.menuItemContainer}>
            <MaterialIcon name={Icons.assignment} color={Colors.dark} />
            <Text style={styles.title}>Reporte diario de Ventas</Text>
            <View style={styles.linkContainer}>
              <TouchableOpacity style={styles.linkTouchable}>
                <MaterialIcon name={Icons.chevronRight} size={30} color={Colors.complementary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.menuItemContainer}>
            <MaterialIcon name={Icons.search} color={Colors.dark} />
            <Text style={styles.title}>Consultar transacción</Text>
            <View style={styles.linkContainer}>
              <TouchableOpacity style={styles.linkTouchable}>
                <MaterialIcon name={Icons.chevronRight} size={30} color={Colors.complementary} />
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
