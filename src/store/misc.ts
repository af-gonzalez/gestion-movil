import { Subject } from 'rxjs';
import { combineReducers } from 'redux';

export enum KeyboardStatus {
  Opened = '@@keyboardStatus/opened',
  Closed = '@@keyboardStatus/closed',
}

export enum ContainerStatus {
  Expanded = '@@containerStatus/expanded',
  Collapsed = '@@containerStatus/collapsed',
}

const keyboard = new Subject<{ status: KeyboardStatus, height?: number }>();
const containerStatus = new Subject<ContainerStatus>();

export const setKeyboardStatus = (status: KeyboardStatus, height = 0) =>
  () => keyboard.next({ status, height });

export const setContainerStatus = (status: ContainerStatus) =>
  () => containerStatus.next(status);

export default combineReducers({
  keyboard: (state = keyboard) => state,
  containerStatus: (state = containerStatus) => state,
});
