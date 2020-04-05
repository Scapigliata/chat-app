const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = process.env.PORT || 4000;
const logger = require('./logger');
const {
  addUser,
  verifyUser,
  createUser,
  deleteUser,
  createMessage,
  innactivityTimer,
} = require('./services');
const cors = require('cors');
let users = {};

const setTimer = (user, socket) =>
  innactivityTimer(60000, user, socket, () => {
    io.emit(
      'USER_DISCONNECTED',
      createMessage(`${user.name} was disconnected due to innactivity`, user)
    );
  });

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

io.on('connection', (socket) => {
  logger.info('A connection has been established', 'socketId:', socket.id);

  socket.on('USER_VERIFY', (nickName, cb) => {
    if (verifyUser(users, nickName)) {
      cb({ userNameTaken: true, user: null });
    } else {
      cb({ userNameTaken: false, user: createUser({ name: nickName }) });
    }
  });

  socket.on('USER_CONNECTED', (user) => {
    logger.info('USER CONNECTED');
    users = addUser(users, user);
    socket.user = user;
    io.emit('USER_CONNECTED', createMessage(null, socket.user.name));
    setTimer(user, socket);
  });

  socket.on('TYPING', (user) => {
    io.emit('TYPING', user);
  });

  socket.on('USER_DISCONNECTED', () => {
    clearTimeout(socket.user.timer);
    io.emit('USER_DISCONNECTED', createMessage(null, socket.user));

    if ('user' in socket) {
      users = deleteUser(users, socket.user);
    }
  });

  socket.on('MESSAGE_SENT', ({ user, message }) => {
    logger.info('MESSAGE SENT', message);
    if (user) {
      clearTimeout(socket.user.timer);
    }
    setTimer(user, socket);
    socket.messages = createMessage(message, user);
    io.emit('MESSAGE_RECIEVED', createMessage(message, user.name));
  });
});

app.get('/', (req, res) => {
  res.send('Chat app');
});

process.on('SIGINT', () => {
  logger.error('Process interrupted');
  io.close();
  process.exit();
});

process.on('SIGTERM', () => {
  logger.error('Killing process');
  io.close();
  process.exit();
});

server.listen(PORT, () => logger.info(`Server is running on port: ${PORT}`));
