import { combineReducers, Reducer } from 'redux';

enum ServiceToQualifyActions {
  setModalStatus = '@@ServiceToQualifyActions/setModalStatus',
}

export const setModalStatus = (status: boolean) => ({
  type: ServiceToQualifyActions.setModalStatus,
  payload: status,
});

const shouldShowModal: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case ServiceToQualifyActions.setModalStatus:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  shouldShowModal,
});
