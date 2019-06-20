import { combineReducers, Reducer } from 'redux';
import { ModalsActions } from '@store/action-types';

export const toggleImagePicker = () => ({ type: ModalsActions.toggleImagePicker });

const showImagePicker: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case ModalsActions.toggleImagePicker:
      return !state;
    default:
      return state;
  }
};

export default combineReducers({
  showImagePicker,
});
