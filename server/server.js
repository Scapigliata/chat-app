const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = process.env.PORT || 9000;
const morgan = require('morgan');
const {
  addUser,
  verifyUser,
  createUser,
  deleteUser,
  createMessage,
} = require('./services');
const cors = require('cors');
let users = {};

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(morgan('combined'));

io.on('connection', socket => {
  console.log('A connection has been established', 'socketId:', socket.id);

  socket.on('USER_VERIFY', (nickName, cb) => {
    if (verifyUser(users, nickName)) {
      cb({ userNameTaken: true, user: null });
    } else {
      cb({ userNameTaken: false, user: createUser({ name: nickName }) });
    }
  });

  socket.on('USER_CONNECTED', user => {
    users = addUser(users, user);
    socket.user = user;
    io.emit('USER_CONNECTED', createMessage(null, socket.user.name));
  });

  socket.on('TYPING', user => {
    io.emit('TYPING', user);
  });

  socket.on('USER_DISCONNECTED', () => {
    if ('user' in socket) {
      users = deleteUser(users, socket.user);
    }
    io.emit('USER_DISCONNECTED', createMessage(null, socket.user.name));
  });

  socket.on('MESSAGE_SENT', ({ user, message }) => {
    socket.messages = createMessage(message, user);
    io.emit('MESSAGE_RECIEVED', createMessage(message, user.name));
  });
});

app.get('/', (req, res) => {
  res.send('Hello');
});

process.on('SIGINT', () => {
  console.log('Process interrupted');
  io.close();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Killing process2');
  io.close();
  process.exit();
});

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
