import {
  MESSAGE_RECIEVED,
  TYPING,
  USER_DISCONNECTED,
  USER_CONNECTED,
  USER_TIMEOUT,
} from '../store/actions/types';

export const socketManager = (
  socket,
  user,
  messageRecieved,
  setUserTyping,
  stopUserTyping,
  clearMessages,
  serverError
) => {
  socket.on(USER_CONNECTED, (data) => {
    messageRecieved({
      ...data,
      message: `${data.user} has joined the chat`,
    });
  });

  socket.on(MESSAGE_RECIEVED, (data) => {
    messageRecieved(data);
  });

  socket.on(USER_TIMEOUT, (data) => {
    socket.emit(USER_DISCONNECTED, data);
  });

  socket.on(USER_DISCONNECTED, (data) => {
    const { name, id } = data.user;
    const { message } = data;

    messageRecieved({
      ...data,
      user: name,
      message: message ? message : `${name} has disconnected from the chat`,
    });
    stopUserTyping({
      user: { id },
    });
  });

  socket.on(TYPING, (userRes) => {
    if (user.id === userRes.id) {
      return;
    }
    setUserTyping(userRes);
  });

  socket.on('connect_error', () => {
    serverError();
  });
};
