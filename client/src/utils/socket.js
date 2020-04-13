import {
  MESSAGE_RECIEVED,
  TYPING,
  USER_DISCONNECTED,
  ADMIN_MESSAGE,
  USER_TIMEOUT,
} from '../store/actions/types';

export const socketManager = (
  socket,
  user,
  messageRecieved,
  setUserTyping,
  stopUserTyping
) => {
  socket.on(ADMIN_MESSAGE, (data) => {
    messageRecieved({
      ...data,
      user: 'Admin',
      message: `${data.user} has joined the chat`,
    });
  });

  socket.on(MESSAGE_RECIEVED, (data) => {
    messageRecieved(data);
  });

  socket.on(USER_TIMEOUT, (data) => {
    data.message = `${data.name} has disconnected due to innactivity`;
    socket.emit(USER_DISCONNECTED, data);
  });

  socket.on(USER_DISCONNECTED, (data) => {
    const { id, name } = data.user;
    const { message } = data;

    messageRecieved({
      ...data,
      user: 'Admin',
      message: message ? message : `${name} has left the chat`,
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
};
