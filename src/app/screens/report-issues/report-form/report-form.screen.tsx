import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Container, Content, Footer, Header } from '@components/layout';
import { Button, Checkbox, InfoMessageModal, InputText, MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../config/constants/styles';
import { styles } from './report-form.styles';
import { NavigationInjectedProps } from 'react-navigation';

type ComponentState = {
  mockIssues: { name: string, selected: boolean }[];
  filter: string;
  showSuccesMessageModal: boolean;
};

type ComponentProps = NavigationInjectedProps;

export class ReportFormScreen extends React.Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    mockIssues: [
      { name: 'No Prende', selected: false },
      { name: 'No Carga Master key', selected: false },
      { name: 'Terminal Bloqueada', selected: false },
      { name: 'Display malo', selected: false },
      { name: 'No Comunica Modem', selected: false },
    ],
    filter: '',
    showSuccesMessageModal: false,
  };

  handleIssueSelection(index: number) {
    const { mockIssues } = this.state;
    mockIssues[index].selected = !mockIssues[index].selected;
    this.setState({ mockIssues: [...mockIssues] });
  }

  handleFilterChange = filter => this.setState({
    filter,
  })

  openSuccessMessageModal = () => this.setState({
    showSuccesMessageModal: true,
  })

  closeSuccessMessageModal = () => this.setState({
    showSuccesMessageModal: false,
  }, () => this.props.navigation.navigate('DeviceSelection'))

  render() {
    const { filter } = this.state;

    return (
      <Container>
        <Header title="Reporte Solicitud" />
        <Content>
          <View style={{ paddingHorizontal: 10 }}>
            <InputText
              rightIcon={Icons.search}
              placeholder="Filtrar"
              value={filter}
              onChange={this.handleFilterChange}
            />
          </View>
          <ScrollView style={styles.issuesContainer}>
            {
              this.state.mockIssues
                .filter(({ name }) => name.toUpperCase().includes(filter.toUpperCase()))
                .map(({ name, selected }, index) => (
                  <View style={styles.itemContainer} key={index}>
                    <View style={styles.titleSection}>
                      <MaterialIcon name={Icons.circle} color={Colors.dark} size={10} />
                      <Text style={styles.title}>{name}</Text>
                    </View>
                    <Checkbox checked={selected} onPress={() => this.handleIssueSelection(index)} />
                  </View>
                ))
            }
          </ScrollView>
          <View style={{ paddingHorizontal: 10 }}>
            <InputText
              label="Observaciones"
              placeholder="Observaciones sobre el reporte"
              textArea
            />
          </View>
        </Content>
        <Footer>
          <Button
            text="Crear Reporte"
            icon={Icons.check}
            onPress={this.openSuccessMessageModal}
          />
        </Footer>
        <InfoMessageModal
          visible={this.state.showSuccesMessageModal}
          message="Solicitud creada exitosamente"
          onClose={this.closeSuccessMessageModal}
        />
      </Container>
    );
  }
}
