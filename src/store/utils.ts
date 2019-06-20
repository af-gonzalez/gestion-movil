import { AnyAction, combineReducers, Reducer } from 'redux';

enum UtilActions {
  setModalState = '@@utils/setModalState',
  setLoadingState = '@@utils/setLoadingState',
}

export const setModalState = (state: boolean): AnyAction => ({
  type: UtilActions.setModalState,
  payload: state,
});

const modalOpened: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case UtilActions.setModalState:
      return action.payload;
    default:
      return state;
  }
};

const issueTypes: Reducer<IssueType[]> = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const loading: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case UtilActions.setLoadingState:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  modalOpened,
  issueTypes,
  loading,
});
