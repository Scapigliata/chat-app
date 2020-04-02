import {
  MESSAGE_SENT,
  MESSAGE_RECIEVED,
  CLEAR_MESSAGES,
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
      return {
        ...state,
        messages: [],
      };
    case 'SET_USER_TYPING':
      const { id, name } = payload;
      let users = Object.assign({}, state.usersTyping);
      if (state.usersTyping.hasOwnProperty(id)) {
        delete users[id];
      } else {
        users[id] = name;
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
