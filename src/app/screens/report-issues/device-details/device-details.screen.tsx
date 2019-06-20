import * as React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Container, Content, Header } from '@components/layout';
import { styles } from './device-details.styles';
import { Colors, Icons } from '../../../../config/constants/styles';
import { CommonIssues } from './common-issues';
import { HistoricIssues } from './historic-issues';
import { Button } from '@components/commons';
import { NavigationInjectedProps } from 'react-navigation';

type ComponentState = {
  selectedSection: string;
};

export class DeviceDetailsScreen extends React.Component<NavigationInjectedProps, ComponentState> {
  state: ComponentState = {
    selectedSection: 'common-issues',
  };

  getHeaderSectionStyles(section: string): StyleProp<ViewStyle> {
    const { selectedSection } = this.state;

    return [
      styles.headerItem,
      { backgroundColor: selectedSection === section ? Colors.white : Colors.lightGray4 },
    ];
  }

  getHeaderTextStyles(section: string): StyleProp<TextStyle> {
    const { selectedSection } = this.state;

    return [
      styles.headerItemText,
      { color: selectedSection === section ? Colors.dark : Colors.lightBlue2 },
    ];
  }

  handleSectionChange = (section: string) => this.setState({
    selectedSection: section,
  })

  render() {
    const { selectedSection } = this.state;
    return (
      <Container>
        <Header title="Reporte Solicitud" >
          <Button
            text="Reportar"
            icon={Icons.plus}
            iconSize={15}
            fontSize={12}
            width={90}
            height={25}
            paddingHorizontal={10}
            backgroundColor={Colors.blue2}
            onPress={() => this.props.navigation.navigate('ReportFormScreen')}
          />
        </Header>
        <Content style={{ paddingVertical: 0, zIndex: 2 }}>
          <View style={styles.headerMenu}>
            <TouchableOpacity
              style={this.getHeaderSectionStyles('common-issues')}
              onPress={() => this.handleSectionChange('common-issues')}
            >
              <Text style={this.getHeaderTextStyles('common-issues')}>Fallas Comunes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.getHeaderSectionStyles('historic-issues')}
              onPress={() => this.handleSectionChange('historic-issues')}
            >
              <Text style={this.getHeaderTextStyles('historic-issues')}>Historico</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {
              selectedSection === 'common-issues' ? (
                <CommonIssues />
              ) : (
                <HistoricIssues />
              )
            }
          </View>
        </Content>
      </Container>
    );
  }
}
