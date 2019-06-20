import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import reduxThunk from 'redux-thunk';
import schedule from '@store/schedule';
import chat from '@store/chat';
import devices from '@store/devices';
import utils from '@store/utils';
import supplies from '@store/supplies';
import serviceToQualify from '@store/service-to-qualify';
import modals from '@store/modals';
import misc from '@store/misc';

import { MainModule } from '../app/modules/main.module';
import {
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { mockData } from './mockData';

const navReducer = createNavigationReducer(MainModule as any);
const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => (state as any).nav,
);

const rootReducer = combineReducers({
  schedule,
  chat,
  devices,
  utils,
  supplies,
  serviceToQualify,
  modals,
  misc,
  nav: navReducer,
});

export const store: Store<ReduxStore> = createStore(
  rootReducer,
  mockData,
  applyMiddleware(reduxThunk, middleware),
);
