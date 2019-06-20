import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import { AgendaSection } from '../sections/agenda';
import { TransactionsDemoSection } from '../sections/transactions-demo';
import { TechnicalTutorialsSection } from '../sections/technical-tutorials';

import { Colors, Fonts, Icons } from '../../config/constants/styles';
import { MaterialIcon } from '@components/commons';
import { DrawerMenu } from '@components/layout';

const routeConfigMap = {
  // TransactionsDemoSection: {
  //   screen: TransactionsDemoSection,
  //   navigationOptions: {
  //     drawerLabel: 'Demo Transacciones',
  //     drawerIcon: ({ tintColor }) => (
  //       <MaterialIcon name={Icons.tvPlay} color={tintColor} />
  //     ),
  //   },
  // },

  // TechnicalTutorialsSection: {
  //   screen: TechnicalTutorialsSection,
  //   navigationOptions: {
  //     drawerLabel: 'Tutoriales Tecnicos',
  //     drawerIcon: ({ tintColor }) => (
  //       <MaterialIcon name={Icons.viewList} color={tintColor} />
  //     ),
  //   },
  // },

  AgendaSection: {
    screen: AgendaSection,
    navigationOptions: {
      drawerLabel: 'Agendamiento',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcon name={Icons.calendarAlt} size={24} color={tintColor} />
      ),
    },
  },
};

const drawerConfig = {
  initialRouteName: 'AgendaSection',
  contentComponent: DrawerMenu,
  contentOptions: {
    activeTintColor: Colors.blue,
    inactiveTintColor: Colors.darkGray,
    inactiveBackgroundColor: Colors.white,
    activeBackgroundColor: Colors.white,
    itemStyle: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.lightGray,
      height: 40,
      alignItems: 'center',
    },
    activeLabelStyle: {
      color: Colors.dark,
      fontFamily: Fonts.Medium,
    },
    labelStyle: {
      fontFamily: Fonts.Regular,
      fontSize: 15,
      height: 40,
      lineHeight: 40,
      marginLeft: 0,
      color: '#414141',
    },
    iconContainerStyle: {
      marginHorizontal: 10,
    },
  },
};

export const TechnicianModule = createDrawerNavigator(routeConfigMap, drawerConfig);
