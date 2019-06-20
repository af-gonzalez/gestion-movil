import * as React from 'react';
import { Subject } from 'rxjs';
import { connect, MapStateToProps } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import { AsyncStorage, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Colors, FontSizes, Icons } from '../../../../config/constants/styles';
import { replaceOptimalRouteItems, setPolyLineCoordinates } from '../../../../store/schedule';

import { styles } from './scheduled-services.styles';
import { Container, Content, Footer, Header } from '@components/layout';
import { Button, MaterialIcon } from '@components/commons';
import { LoadingChatModal } from '../../chat';
import { PendingService } from './pending-service';
import { Mutation, Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

type PropsFromState = {
  optimalRouteItems: OptimalRouteItems;
  pendingServices: ScheduledService[];
  activeService: ScheduledService;
};

type PropsFromDispatch = {
  replaceOptimalRouteItems?: typeof replaceOptimalRouteItems;
  setPolyLineCoordinates?: typeof setPolyLineCoordinates;
};

type ComponentProps = PropsFromState & PropsFromDispatch & NavigationInjectedProps;

type ComponentState = {
  openedItems: boolean;
  chatModalVisible: boolean;
  technicianId: string;
};

const techQuery = gql`
  query techServices($technicianId: String!){
    technicianServices(technicianId: $technicianId){
      technician {
        id
      }
      id
      scheduledTime
      subsidiary{
        name
        address
        commerce{
          priority {
            name
            color
          }
        }
      }
    }
    technicianActiveService(technicianId: $technicianId){
      id
      subsidiary{
        name
        address
      }
    }
  }
`;

const subAs = gql`
  subscription serviceAsigned {
    serviceAsigned {
      technician {
        id
      }
      id
      scheduledTime
      subsidiary{
        name
        address
        commerce{
          priority {
            name
            color
          }
        }
      }
    }
  }
`;

const subcan = gql`
  subscription serviceDeleted {
    serviceDeleted {
      technician {
        id
      }
      id
      scheduledTime
      subsidiary{
        name
        address
        commerce{
          priority {
            name
            color
          }
        }
      }
    }
  }
`;

const mapStateToProps: MapStateToProps<PropsFromState, {}, ReduxStore> =
  ({ schedule: { optimalRouteItems, pendingServices, activeService } }) => ({
    optimalRouteItems,
    pendingServices,
    activeService,
  });

// @ts-ignore
@connect(mapStateToProps, { replaceOptimalRouteItems, setPolyLineCoordinates })
export class ScheduledServicesScreen extends React.Component<ComponentProps, ComponentState> {
  unsub: Function;
  unSunCan: Function;
  openItemsSubject = new Subject<boolean>();
  closeItemSubject = new Subject<number>();
  expandItemSubject = new Subject<number>();
  state = {
    openedItems: false,
    chatModalVisible: false,
    technicianId: '',
  };

  async componentDidMount(): Promise<void> {
    const sessionUser: SessionUser =
      JSON.parse(await AsyncStorage.getItem('sessionUser') as string);
    this.setState({ technicianId: sessionUser.user.id });
  }

  handleOpenItemsAction = () => {
    this.setState({ openedItems: true });
    this.openItemsSubject.next(true);
  }

  handleCloseItemsAction = () => {
    this.setState({ openedItems: false });
    this.openItemsSubject.next(false);
  }

  handleSelectAllItemsAction = () => {
    this.props.replaceOptimalRouteItems(
      this.props.pendingServices.map(({ id, coordinates }) => ({ id, coordinates })),
    );
  }

  handleDeselectAllItemsAction = () => {
    this.props.replaceOptimalRouteItems([]);
  }

  handleOptimalRouteButtonPress = () => {
    this.props.setPolyLineCoordinates();
  }

  renderActiveService(service: Service) {
    if (!service) return null;

    return (
      <React.Fragment>
        <View style={styles.sectionTitle}>
          <MaterialIcon name={Icons.wrench} color={Colors.gray} size={18} />
          <Text style={styles.sectionTitleText}>Servicio Activo</Text>
        </View>
        <View style={styles.activeService}>
          <View style={styles.activeServiceInfo}>
            <View style={styles.itemField}>
              <Text style={styles.itemFieldTitle}>Comercio</Text>
              <View style={styles.verticalDivisor} />
              <View style={styles.itemFieldDescriptionContainer}>
                <Text style={styles.itemFieldDescription}>{service.subsidiary.name}</Text>
              </View>
            </View>
            <View style={styles.itemField}>
              <Text style={styles.itemFieldTitle}>Dirección</Text>
              <View style={styles.verticalDivisor} />
              <View style={styles.itemFieldDescriptionContainer}>
                <Text style={styles.itemFieldDescription}>{service.subsidiary.address}</Text>
              </View>
            </View>
          </View>
          <View style={styles.activeServiceButtons}>
            <View style={styles.activeServiceButton}>
              <Button
                text="Finalizar Servicio"
                fontSize={FontSizes.small}
                height={35}
                icon={Icons.circleCheck}
                iconSize={20}
                paddingHorizontal={10}
                backgroundColor={Colors.blue}
                onPress={() => this.props.navigation.navigate('FinishService', { serviceId: service.id })}
              />
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }

  render() {
    const { openedItems } = this.state;
    const { optimalRouteItems } = this.props;
    return (
      <Container>
        <Header title="Agendamiento" mainView>
          <Button
            text="Ruta Optima"
            icon={Icons.pin}
            iconSize={15}
            fontSize={12}
            width={115}
            height={25}
            paddingHorizontal={10}
            backgroundColor={openedItems ? Colors.gray : Colors.blue2}
            onPress={this.handleOpenItemsAction}
            disabled={openedItems}
          />
        </Header>
        <Content>
          {this.state.technicianId !== '' && (
            <Query
              query={techQuery}
              variables={{ technicianId: this.state.technicianId }}
            >
              {({ data, loading, subscribeToMore }: QueryResult<{ technicianServices: Service[], technicianActiveService: Service }>) => {

                if (this.unsub) {
                  this.unsub();
                }

                this.unsub = subscribeToMore<{ serviceAsigned: Service }>({
                  document: subAs,
                  updateQuery: (prev, { subscriptionData: { data: { serviceAsigned } } }) => {
                    const { technicianServices } = prev;
                    if (serviceAsigned.technician.id === this.state.technicianId) {
                      if (
                        moment(serviceAsigned.scheduledTime).isSameOrAfter(moment().startOf('day')) &&
                        moment(serviceAsigned.scheduledTime).isSameOrBefore(moment().endOf('day')) &&
                        technicianServices.every(({ id }) => id !== serviceAsigned.id)
                      ) {
                        technicianServices.push(serviceAsigned);
                      }

                      return {
                        ...prev,
                        technicianServices: [...technicianServices.sort((a, b) => {
                          return moment(a.scheduledTime).isAfter(moment(b.scheduledTime)) ? 0 : -1;
                        })],
                      };
                    }

                    return {
                      ...prev,
                      technicianServices: [...technicianServices.filter(({ id }) => id !== serviceAsigned.id)],
                    };
                  },
                });

                if (this.unSunCan) {
                  this.unSunCan();
                }

                this.unSunCan = subscribeToMore<{ serviceDeleted: Service }>({
                  document: subcan,
                  updateQuery: (prev, { subscriptionData: { data: { serviceDeleted } } }) => {
                    const { technicianServices, technicianActiveService } = prev;
                    return {
                      ...prev,
                      technicianServices: [...technicianServices.filter(({ id }) => id !== serviceDeleted.id)],
                      technicianActiveService: technicianActiveService !== null ?
                        technicianActiveService.id === serviceDeleted.id ? null : technicianActiveService : null,
                    };
                  },
                });


                return !loading && (
                  <React.Fragment>
                    {data && this.renderActiveService(data.technicianActiveService)}
                    <View style={styles.sectionTitle}>
                      <MaterialIcon name={Icons.viewListAlt} color={Colors.gray} />
                      <Text style={styles.sectionTitleText}>Servicios Pendientes</Text>
                    </View>
                    <ScrollView>
                      {
                        data && data.technicianServices.map(service => (
                          <PendingService
                            key={service.id}
                            closeItemSubject={this.closeItemSubject}
                            openToRightSubject={this.openItemsSubject}
                            expandItemSubject={this.expandItemSubject}
                            service={service}
                            shouldA={data.technicianActiveService !== null}
                          />
                        ))
                      }
                      <LoadingChatModal
                        visible={this.state.chatModalVisible}
                        onCancel={() => this.setState({ chatModalVisible: false })}
                      />
                    </ScrollView>
                  </React.Fragment>
                );
              }}
            </Query>
          )}
        </Content>
        {openedItems && (
          <Footer style={styles.footerView}>
            <View style={styles.footerActionsContainer}>
              <TouchableOpacity style={styles.footerAction} onPress={this.handleCloseItemsAction}>
                <MaterialIcon name={Icons.close} size={24} color={Colors.darkGray} />
                <Text style={styles.footerCloseActionText}>Cancelar Seleción</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerAction}
                onPress={this.handleSelectAllItemsAction}
              >
                <MaterialIcon name={Icons.squareCheck} size={24} color={Colors.dark} />
                <Text style={styles.footerActionText}>Seleccionar Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerAction}
                onPress={this.handleDeselectAllItemsAction}
              >
                <MaterialIcon name={Icons.squareOutline} size={24} color={Colors.dark} />
                <Text style={styles.footerActionText}>Deseleccionar Todos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerButtonContainer}>
              <Button
                text="Ver Ruta"
                fontSize={FontSizes.normal}
                icon={Icons.pin}
                iconSize={24}
                paddingHorizontal={10}
                backgroundColor={optimalRouteItems.length === 0 ? Colors.gray : Colors.dark}
                width={115}
                height={40}
                disabled={optimalRouteItems.length === 0}
                onPress={this.handleOptimalRouteButtonPress}
              />
            </View>
          </Footer>
        )}
      </Container>
    );
  }
}
