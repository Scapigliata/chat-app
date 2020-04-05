const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = process.env.PORT || 4000;
const morgan = require('morgan');
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

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(morgan('combined'));

io.on('connection', (socket) => {
  console.log('A connection has been established', 'socketId:', socket.id);

  socket.on('USER_VERIFY', (nickName, cb) => {
    if (verifyUser(users, nickName)) {
      cb({ userNameTaken: true, user: null });
    } else {
      cb({ userNameTaken: false, user: createUser({ name: nickName }) });
    }
  });

  socket.on('USER_CONNECTED', (user) => {
    users = addUser(users, user);
    socket.user = user;
    io.emit('USER_CONNECTED', createMessage(null, socket.user.name));
    socket.user.timer = innactivityTimer(60000, user, () => {
      io.emit(
        'USER_DISCONNECTED',
        createMessage(`${user.name} was disconnected due to innactivity`, user)
      );
    });
  });

  socket.on('TYPING', (user) => {
    console.log('USER TYPING:', user);
    io.emit('TYPING', user);
  });

  socket.on('USER_DISCONNECTED', () => {
    io.emit('USER_DISCONNECTED', createMessage(null, socket.user));

    if ('user' in socket) {
      users = deleteUser(users, socket.user);
    }
  });

  socket.on('MESSAGE_SENT', ({ user, message }) => {
    clearTimeout(socket.user.timer);

    socket.messages = createMessage(message, user);
    console.log('MESSAGE SENT:', user, 'MESSAGE: ', message);
    io.emit('MESSAGE_RECIEVED', createMessage(message, user.name));
  });
});

app.get('/', (req, res) => {
  res.send('Chat app');
});

process.on('SIGINT', () => {
  console.log('Process interrupted');
  io.close();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Killing process');
  io.close();
  process.exit();
});

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
