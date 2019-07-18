import * as React from 'react';
import { Container, Content, Footer, Header } from '@components/layout';
import { connect, MapStateToProps } from 'react-redux';
import {
  Button,
  ConfirmationMessageModal, InfoMessageModal,
  MaterialIcon,
  SupplyListItem,
} from '@components/commons';
import { removeSupplyItem, cleanSupplies } from '../../../../store/supplies';
import { styles } from './supplies-list.styles';
import { Colors, Icons } from '../../../../config/constants/styles';
import { Text, View } from 'react-native';
import { AddSupplyModal } from '../add-supply';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const saveRequest = gql`
  mutation request{
    saveRequest{
      success
      message
    }
  }
`;

type PropsFromState = {
  supplies: Supply[];
};

type PropsFromDispatch = {
  removeSupplyItem?: typeof removeSupplyItem;
  cleanSupplies?: typeof cleanSupplies;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

type ComponentState = {
  showCofirmationModal: boolean;
  showAddSupplyModal: boolean;
  showRequestConfirmation: boolean;
  showSuccessMessageModal: boolean;
  supplyIdToDelete: number;
};

const mapStateToProps: MapStateToProps<PropsFromState, {}, ReduxStore> =
  ({ supplies: { list } }) => ({ supplies: list });

// @ts-ignore
@connect(mapStateToProps, { removeSupplyItem, cleanSupplies })
export class SuppliesListScreen extends React.Component<ComponentProps, ComponentState> {
  state: ComponentState = {
    showCofirmationModal: false,
    showAddSupplyModal: false,
    showRequestConfirmation: false,
    showSuccessMessageModal: false,
    supplyIdToDelete: null,
  };

  openConfirmationModal = (supplyId: number) => this.setState({
    showCofirmationModal: true, supplyIdToDelete: supplyId,
  })

  closeConfirmationModal = () => this.setState({
    showCofirmationModal: false,
  })

  openAddSupplyModal = () => this.setState({
    showAddSupplyModal: true,
  })

  closeAddSupplyModal = () => this.setState({
    showAddSupplyModal: false,
  })

  openRequestConfirmationModal = () => this.setState({
    showRequestConfirmation: true,
  })

  closeRequestConfirmationModal = () => this.setState({
    showRequestConfirmation: false,
  })

  openSuccessMessageModal = () => this.setState({
    showSuccessMessageModal: true,
  })

  closeSuccessMessageModal = () => this.setState({
    showSuccessMessageModal: false,
  })

  handleElementDeletion = () => {
    const { supplyIdToDelete } = this.state;
    const { removeSupplyItem } = this.props;
    this.closeConfirmationModal();
    removeSupplyItem(supplyIdToDelete);
  }

  submitRequest = async () => {
    this.closeRequestConfirmationModal();
    await this.props.cleanSupplies();
    this.openSuccessMessageModal();
  }

  render() {
    const { supplies } = this.props;
    return (
      <Container>
        <Header title="Solicitud de Insumos" mainView>
          <Button
            text="Agregar"
            icon={Icons.plus}
            iconSize={15}
            fontSize={12}
            width={90}
            height={25}
            paddingHorizontal={10}
            backgroundColor={Colors.blue2}
            onPress={this.openAddSupplyModal}
          />
        </Header>
        <Content>
          <View style={styles.sectionTitle}>
            <MaterialIcon name={Icons.viewListAlt} color={Colors.gray} size={18} />
            <Text style={styles.sectionTitleText}>Lista de insumos a solicitar</Text>
          </View>
          {supplies.length > 0 ? supplies.map((supply, index) => (
            <SupplyListItem
              supplyItem={supply}
              key={index}
              onDelete={this.openConfirmationModal}
            />
          )) : (
            <View style={styles.emptyListMessageContainer}>
              <MaterialIcon name={Icons.archive} color={Colors.dark} size={40}/>
              <Text style={styles.emptyListMessage}>
                Agrege elementos para realizar la solicitud
              </Text>
            </View>
          )
          }
        </Content>
        <Footer>
          <Mutation mutation={saveRequest}>
            {(saveR, { loading }) => (
              <React.Fragment>
                <Button
                  text="Realizar Solicitud"
                  icon={Icons.forward}
                  disabled={supplies.length === 0}
                  onPress={this.openRequestConfirmationModal}
                  withLoading
                  loading={loading}
                />
                <ConfirmationMessageModal
                  visible={this.state.showRequestConfirmation}
                  message="¿Desea realizar la solicitud con los elementos seleccionados?"
                  onConfirm={() => saveR().then(this.submitRequest)}
                  onCancel={this.closeRequestConfirmationModal}
                />
              </React.Fragment>
            )}
          </Mutation>
        </Footer>
        <AddSupplyModal
          visible={this.state.showAddSupplyModal}
          onClose={this.closeAddSupplyModal} />
        <ConfirmationMessageModal
          visible={this.state.showCofirmationModal}
          message="¿Desea eliminar el elemento seleccionado?"
          onConfirm={this.handleElementDeletion}
          onCancel={this.closeConfirmationModal} />
        <InfoMessageModal
          visible={this.state.showSuccessMessageModal}
          message="Su solicitud ha sido procesada correctamente"
          onClose={this.closeSuccessMessageModal} />
      </Container>
    );
  }
}
