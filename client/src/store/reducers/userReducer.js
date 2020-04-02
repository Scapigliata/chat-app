import { USER_CONNECTED, USER_DISCONNECTED } from '../../store/actions/types';

const initalState = null;

const userReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case USER_CONNECTED:
      return payload;
    case USER_DISCONNECTED:
      return initalState;
    default:
      return state;
  }
};

export default userReducer;
