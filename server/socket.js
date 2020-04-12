const io = require('./server').io;
const logger = require('./logger');
const {
  addUser,
  verifyUser,
  createUser,
  deleteUser,
  createMessage,
  setTimer,
} = require('./services');
let users = {};

module.exports = (socket) => {
  logger.info('A connection has been established');

  socket.on('USER_VERIFY', (nickName, cb) => {
    if (verifyUser(users, nickName)) {
      cb({ userNameTaken: true, user: null });
    } else {
      cb({ userNameTaken: false, user: createUser({ name: nickName }) });
    }
  });

  socket.on('USER_CONNECTED', (user) => {
    logger.info(`USER: ${user.name} is connected`);
    socket.user = user;
    if (user) {
      io.emit('ADMIN_MESSAGE', createMessage(null, socket.user.name));
    }
    setTimer(120000, user, socket);
    users = addUser(users, user);
  });

  socket.on('TYPING', (user) => {
    logger.info(`USER: ${user.name} is typing`);
    io.emit('TYPING', user);
  });

  socket.on('USER_DISCONNECTED', (user) => {
    logger.info(`USER: ${user} disconnected`);
    clearTimeout(user.timer);
    io.emit('USER_DISCONNECTED', createMessage(null, user));

    users = deleteUser(users, user);
    console.log('userdisc');
  });

  socket.on('USER_TIMEOUT', (user) => {
    logger.info(`USER: ${socket.user.name} disconnected due to innactivity`);
    deleteUser(users, user);
  });

  socket.on('MESSAGE_SENT', ({ user, message }) => {
    logger.info(`USER: ${user.name} sent a message`);
    if (user) {
      clearTimeout(user.timer);
    }
    setTimer(120000, user, socket);
    socket.messages = createMessage(message, user);
    if (user) {
      io.emit('MESSAGE_RECIEVED', createMessage(message, user.name));
    }
  });

  socket.on('disconnect', () => {
    logger.info('Client disconnected');
  });
};
