import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors, Icons } from '../../../../../config/constants/styles';
import { addOptimalRouteItem, removeOptimalRouteITem } from '../../../../../store/schedule';
import { Checkbox, MaterialIcon, MiniMap } from '@components/commons';

import { styles } from './pending-service.styles';
import moment from 'moment';

type PropsFormState = {
  isItemSelected?: boolean;
  activeService?: boolean;
};

type PropsFromDispath = {
  addOptimalRouteItem?: () => void;
  removeOptimalRouteITem?: () => void;
};

type OwnProps = {
  closeItemSubject: Subject<number>;
  expandItemSubject: Subject<number>;
  openToRightSubject: Subject<any>;
  service: Service;
  navigation?: any;
  shouldA: boolean;
};

type ComponentProps = PropsFormState & PropsFromDispath & OwnProps;

type ComponentState = {
  expanded: boolean;
  swiped: boolean;
  opened: boolean;
};

const mapStateToProps: MapStateToProps<PropsFormState, OwnProps, ReduxStore> =
  ({ schedule: { optimalRouteItems, activeService } }, { service }) => ({
    isItemSelected: optimalRouteItems.findIndex(({ id }) => id === service.id) >= 0,
    activeService: activeService !== null,
  });

const mapDispatchToProps: MapDispatchToProps<PropsFromDispath, OwnProps> =
  (dispatch, { service: { id } }) => ({
    addOptimalRouteItem: () => dispatch(addOptimalRouteItem({
      id,
      coordinates: { latitude: 4.7349681, longitude: -74.0565834 },
    })),
    removeOptimalRouteITem: () => dispatch(removeOptimalRouteITem(id)),
  });

// @ts-ignore
@withNavigation
// @ts-ignore
@connect(mapStateToProps, mapDispatchToProps)
export class PendingService extends React.Component<ComponentProps, ComponentState> {
  onUnMount = new Subject();
  expandableContentHeight = new Animated.Value(0);
  swipeableContentTranslateX = new Animated.Value(0);
  state = {
    expanded: false,
    swiped: false,
    opened: false,
  };

  componentDidMount(): void {
    const {
      closeItemSubject, service, openToRightSubject, expandItemSubject,
    } = this.props;

    closeItemSubject
      .pipe(takeUntil(this.onUnMount))
      .subscribe((id) => {
        if (id !== service.id && this.state.swiped) {
          this.closeItem();
        }
      });
    openToRightSubject
      .pipe(takeUntil(this.onUnMount))
      .subscribe((openItems: boolean) => {
        if (openItems) this.openItemToTheRight();
        else this.closeItem();
      });
    expandItemSubject
      .pipe(takeUntil(this.onUnMount))
      .subscribe((id) => {
        if (id !== service.id && this.state.expanded) {
          this.hideItemMap();
        }
      });
  }

  componentWillUnmount() {
    this.onUnMount.next();
    this.onUnMount.complete();
  }

  handleResponderEnd = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const { swiped } = this.state;
    const velocityThreshold = 0.2;
    const directionalOffsetThreshold = 80;
    const { vx, dx, dy } = gestureState;
    const isValidSwipe = Math.abs(vx) > velocityThreshold &&
      Math.abs(dy) < directionalOffsetThreshold;
    if (isValidSwipe) {
      if (dx > 0 && swiped) {
        this.closeItem();
      }
      if (dx < 0 && !swiped) {
        this.props.closeItemSubject.next(this.props.service.id);
        this.openItemToTheLeft();
      }
    }
  }

  openItemToTheLeft(): void {
    this.hideItemMap();
    this.setState({ swiped: true });
    Animated.timing(
      this.swipeableContentTranslateX,
      {
        toValue: -150,
        duration: 250,
        easing: Easing.linear,
      },
    ).start();
  }

  openItemToTheRight(): void {
    this.hideItemMap();
    this.setState({ opened: true });
    Animated.timing(
      this.swipeableContentTranslateX,
      {
        toValue: 50,
        duration: 450,
      },
    ).start();
  }

  closeItem(): void {
    const { isItemSelected, removeOptimalRouteITem } = this.props;
    this.setState({ swiped: false, opened: false });
    Animated.timing(
      this.swipeableContentTranslateX,
      {
        toValue: 0,
        duration: 300,
      },
    ).start(() => {
      if (isItemSelected) {
        removeOptimalRouteITem();
      }
    });
  }

  shouldSetResponder = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const { dx, dy } = gestureState;
    const isClick = Math.abs(dx) < 5 && Math.abs(dy) < 5;
    return e.nativeEvent.touches.length === 1 && !isClick && !this.state.opened;
  }

  swipableContentPR = PanResponder.create({
    onStartShouldSetPanResponder: this.shouldSetResponder,
    onMoveShouldSetPanResponder: this.shouldSetResponder,
    onPanResponderRelease: this.handleResponderEnd,
    onPanResponderTerminate: this.handleResponderEnd,
  });

  hideItemMap = () => {
    this.setState({ expanded: false });
    Animated.parallel([
      Animated.timing(
        this.expandableContentHeight,
        {
          toValue: 0,
          duration: 250,
        },
      ),
    ]).start();
  }

  showItemMap = () => {
    const { expandItemSubject, service } = this.props;
    this.setState({ expanded: true });
    expandItemSubject.next(service.id);
    Animated.timing(
      this.expandableContentHeight,
      {
        toValue: 230,
        duration: 300,
      },
    ).start();
  }

  handleItemCheckboxPress = () => {
    const { isItemSelected, addOptimalRouteItem, removeOptimalRouteITem } = this.props;
    if (isItemSelected) removeOptimalRouteITem();
    else addOptimalRouteItem();
  }

  renderExpandIcon(): JSX.Element {
    if (this.state.opened) return null;
    return this.state.expanded ?
      (
        <TouchableOpacity onPress={this.hideItemMap} style={styles.expandItemButton}>
          <MaterialIcon name={Icons.chevronUp} color={Colors.complementary} />
        </TouchableOpacity>
      ) :
      (
        <TouchableOpacity onPress={this.showItemMap} style={styles.expandItemButton}>
          <MaterialIcon name={Icons.chevronDown} color={Colors.complementary} />
        </TouchableOpacity>
      );
  }

  render(): JSX.Element {
    const { subsidiary, id, scheduledTime } = this.props.service;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.hiddenLeftSection}>
          <Checkbox checked={this.props.isItemSelected} onPress={this.handleItemCheckboxPress} />
        </View>
        <View style={styles.hiddenRightSection}>
          {
            !this.props.shouldA && (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('InitService', { serviceId: id })}
                style={styles.initServiceButton}
              >
                <MaterialIcon name={Icons.wrench} size={20} color={Colors.dark} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.initServiceButtonText}>Iniciar Servicio</Text>
                </View>
              </TouchableOpacity>
            )
          }
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CustomerRatings', { commerceName: subsidiary.name })}
            style={[styles.seeRatingsButton, { height: this.props.activeService ? 50 : 35 }]}
          >
            <MaterialIcon name={Icons.star} size={20} color={Colors.yellow} />
            <View style={{ flex: 1 }}>
              <Text style={styles.seeRatingsButtonText}>Calificaciones</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{ transform: [{ translateX: this.swipeableContentTranslateX }] }}
        >
          <View style={styles.visibleContent} {...this.swipableContentPR.panHandlers}>
            <View style={styles.itemField}>
              <Text style={styles.itemFieldTitle}>Comercio</Text>
              <View style={styles.verticalDivisor} />
              <View style={styles.itemFieldDescriptionContainer}>
                <Text style={styles.itemFieldDescription}>{subsidiary.name}</Text>
              </View>
            </View>
            <View style={styles.itemField}>
              <Text style={styles.itemFieldTitle}>Dirección</Text>
              <View style={styles.verticalDivisor} />
              <View style={styles.itemFieldDescriptionContainer}>
                <Text style={styles.itemFieldDescription}>{subsidiary.address}</Text>
              </View>
            </View>
            <View style={styles.itemField}>
              <Text style={styles.itemFieldTitle}>Prioridad</Text>
              <View style={styles.verticalDivisor} />
              <View style={styles.itemFieldDescriptionContainer}>
                <MaterialIcon
                  name={Icons.circle}
                  color={subsidiary.commerce.priority.color}
                  size={10}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.itemFieldDescription}>{subsidiary.commerce.priority.name}</Text>
              </View>
            </View>
            <View style={styles.itemField}>
              <Text style={styles.itemFieldTitle} />
              <View style={styles.verticalDivisor} />
              <View style={styles.itemFieldDescriptionContainer}>
                <Text style={styles.itemFieldDescription}>Ubicación</Text>
                {this.renderExpandIcon()}
              </View>
            </View>
            <View style={styles.clockBox}>
              <MaterialIcon name={Icons.time} color={Colors.white} size={15} />
              <Text style={styles.clockTime}>{moment(scheduledTime).format('hh:mm a')}</Text>
            </View>
          </View>
          <Animated.View style={[
            styles.expandableContent,
            { height: this.expandableContentHeight },
          ]}>
            <View style={{
              padding: 10,
              borderTopWidth: 1,
              borderTopColor: Colors.lightGray2,
            }}>
              {
                this.state.expanded && (
                  <MiniMap
                    latitude={4.7349681}
                    longitude={-74.0565834}
                    latitudeDelta={0.0052}
                    longitudeDelta={0.0031}
                  />
                )
              }
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}
