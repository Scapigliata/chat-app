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
    socket.emit(USER_DISCONNECTED, data);
  });

  socket.on(USER_DISCONNECTED, (data) => {
    const { id } = data.user;

    messageRecieved({
      ...data,
      user: 'Admin',
      message: `${data.user} has disconnected from the chat`,
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
