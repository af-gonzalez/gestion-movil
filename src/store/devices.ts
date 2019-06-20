import { combineReducers, Reducer } from 'redux';

const references: Reducer<DeviceReference[]> = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const list: Reducer<Device[]> = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  references,
  list,
});
