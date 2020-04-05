const io = require('./server').io;
const logger = require('./logger');
const {
  addUser,
  verifyUser,
  createUser,
  deleteUser,
  createMessage,
  innactivityTimer,
} = require('./services');
let users = {};

const setTimer = (user, socket) =>
  innactivityTimer(60000, user, socket, () => {
    io.emit(
      'USER_DISCONNECTED',
      createMessage(`${user.name} was disconnected due to innactivity`, user)
    );
  });

module.exports = (socket) => {
  logger.info('A connection has been established', 'socketId:', socket.id);

  socket.on('USER_VERIFY', (nickName, cb) => {
    if (verifyUser(users, nickName)) {
      cb({ userNameTaken: true, user: null });
    } else {
      cb({ userNameTaken: false, user: createUser({ name: nickName }) });
    }
  });

  socket.on('USER_CONNECTED', (user) => {
    logger.info(`USER: ${user.name} is connected`);
    users = addUser(users, user);
    socket.user = user;
    io.emit('USER_CONNECTED', createMessage(null, socket.user.name));
    setTimer(user, socket);
  });

  socket.on('TYPING', (user) => {
    logger.info(`USER: ${user.name} is typing`);
    io.emit('TYPING', user);
  });

  socket.on('USER_DISCONNECTED', () => {
    logger.info(`USER: ${socket.user.name} disconnected`);
    clearTimeout(socket.user.timer);
    io.emit('USER_DISCONNECTED', createMessage(null, socket.user));

    if ('user' in socket) {
      users = deleteUser(users, socket.user);
    }
  });

  socket.on('MESSAGE_SENT', ({ user, message }) => {
    logger.info(`USER: ${user.name} sent a message`);
    if (user) {
      clearTimeout(socket.user.timer);
    }
    setTimer(user, socket);
    socket.messages = createMessage(message, user);
    io.emit('MESSAGE_RECIEVED', createMessage(message, user.name));
  });
};
