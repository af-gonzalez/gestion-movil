import { AnyAction, combineReducers, Reducer } from 'redux';

enum SuppliesActions {
  addSupply = '@@supplies/addSupply',
  removeSupply = '@@supplies/removeSupply',
  updateSupplyAmount = '@@suplies/increaseSupplyAmount',
  cleanSupplies = '@@supplies/cleanSupplies',
}

export const addSupply = (supply: Supply): AnyAction => ({
  type: SuppliesActions.addSupply,
  payload: supply,
});

export const updateSupplyAmount = (id: number, amount: number): AnyAction => ({
  type: SuppliesActions.updateSupplyAmount,
  payload: { id, amount },
});

export const removeSupplyItem = (id: number): AnyAction => ({
  type: SuppliesActions.removeSupply,
  payload: id,
});

export const cleanSupplies = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({ type: '@@utils/setLoadingState', payload: true });
    setTimeout(
      () => {
        dispatch({ type: SuppliesActions.cleanSupplies });
        dispatch({ type: '@@utils/setLoadingState', payload: false });
        resolve();
      },
      2000,
    );
  });
};

const list: Reducer<Supply[]> = (state = [], action) => {
  switch (action.type) {
    case SuppliesActions.addSupply:
      return [...state, action.payload];
    case SuppliesActions.removeSupply:
      state.splice(state.findIndex(({ item }) => item.id === action.payload), 1);
      return [...state];
    case SuppliesActions.updateSupplyAmount:
      const index = state.findIndex(({ item }) => item.id === action.payload.id);
      state.splice(index, 1, { ...state[index], amount: action.payload.amount });
      return [...state];
    case SuppliesActions.cleanSupplies:
      return [];
    default:
      return state;
  }
};

const types: Reducer<SupplyType[]> = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  list,
  types,
});
