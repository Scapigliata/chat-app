import { INIT_SOCKET } from '../actions/types';

const initalState = {
  socket: null,
};

const configReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case INIT_SOCKET:
      return { ...state, socket: payload };
    default:
      return state;
  }
};

export default configReducer;
