import {
  INIT_SOCKET,
  SERVER_CONNECTED,
  SERVER_DISCONNECTED,
  SERVER_ERROR,
} from '../actions/types';

const initalState = {
  socket: null,
  serverState: '',
};

const configReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case INIT_SOCKET:
      return { ...state, socket: payload };
    case SERVER_CONNECTED:
      return { ...state, serverState: 'Connected' };
    case SERVER_DISCONNECTED:
      return { ...state, serverState: 'Disconnected' };
    case SERVER_ERROR:
      return { ...state, serverState: 'Error' };
    default:
      return state;
  }
};

export default configReducer;
