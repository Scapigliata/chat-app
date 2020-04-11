import {
  MESSAGE_SENT,
  MESSAGE_RECIEVED,
  INIT_SOCKET,
  USER_CONNECTED,
  USER_DISCONNECTED,
  CLEAR_MESSAGES,
  SET_USER_TYPING,
  STOP_USER_TYPING,
  SERVER_CONNECTED,
  SERVER_DISCONNECTED,
} from './types';

export const messageSent = (payload) => ({
  type: MESSAGE_SENT,
  payload,
});

export const messageRecieved = (payload) => ({
  type: MESSAGE_RECIEVED,
  payload,
});

export const initSocket = (payload) => ({
  type: INIT_SOCKET,
  payload,
});

export const userConnected = (payload) => ({
  type: USER_CONNECTED,
  payload,
});

export const userDisconnected = (payload) => ({
  type: USER_DISCONNECTED,
  payload,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

export const setUserTyping = (user) => ({
  type: SET_USER_TYPING,
  payload: user,
});

export const stopUserTyping = (user) => ({
  type: STOP_USER_TYPING,
  payload: user,
});

export const serverConnected = () => ({
  type: SERVER_CONNECTED,
});

export const serverDisconnected = () => ({
  type: SERVER_DISCONNECTED,
});
