import {
  MESSAGE_SENT,
  MESSAGE_RECIEVED,
  CLEAR_MESSAGES,
  SET_USER_TYPING,
  STOP_USER_TYPING,
} from '../../store/actions/types';

const initalState = {
  messages: [],
  usersTyping: {},
};

const messagesReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case MESSAGE_SENT:
    case MESSAGE_RECIEVED:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case CLEAR_MESSAGES:
      return { ...state, messages: [] };
    case SET_USER_TYPING:
      let newUsers = Object.assign({}, state.usersTyping);
      if (state.usersTyping.hasOwnProperty(payload.id)) {
        delete newUsers[payload.id];
      } else {
        newUsers[payload.id] = payload.name;
      }
      return {
        ...state,
        usersTyping: newUsers,
      };
    case STOP_USER_TYPING:
      let users = Object.assign({}, state.usersTyping);
      if (state.usersTyping.hasOwnProperty(payload.id)) {
        delete newUsers[payload.id];
      }
      return {
        ...state,
        usersTyping: users,
      };
    default:
      return state;
  }
};

export default messagesReducer;
