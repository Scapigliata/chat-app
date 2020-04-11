import {
  INIT_SOCKET,
  SERVER_CONNECTED,
  SERVER_DISCONNECTED,
  SERVER_ERROR,
} from '../actions/types';

const initalState = {
  socket: null,
  serverState: 'Offline',
};

const configReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case INIT_SOCKET:
      return { ...state, socket: payload };
    case SERVER_CONNECTED:
      return { ...state, serverState: 'Online' };
    case SERVER_DISCONNECTED:
      return { ...state, serverState: 'Offline' };
    case SERVER_ERROR:
      return { ...state, serverState: 'Error' };
    default:
      return state;
  }
};

export default configReducer;
