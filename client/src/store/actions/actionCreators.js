import {
  MESSAGE_SENT,
  MESSAGE_RECIEVED,
  INIT_SOCKET,
  USER_CONNECTED,
  CLEAR_MESSAGES,
} from './types';

export const messageSent = payload => ({
  type: MESSAGE_SENT,
  payload,
});

export const messageRecieved = payload => ({
  type: MESSAGE_RECIEVED,
  payload,
});

export const initSocket = payload => ({
  type: INIT_SOCKET,
  payload,
});

export const userConnected = payload => ({
  type: USER_CONNECTED,
  payload,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

export const setUserTyping = user => ({
  type: 'SET_USER_TYPING',
  payload: user,
});
