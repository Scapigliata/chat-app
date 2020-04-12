const { uuid } = require('uuidv4');

const createUser = ({ name = '' } = {}) => ({
  id: uuid(),
  name,
});

const createMessage = (message, user) => ({
  id: uuid(),
  time: new Date(),
  user,
  message,
});

const verifyUser = (users, user) => {
  return user in users;
};

const deleteUser = (users, user) => {
  let userList = Object.assign({}, users);
  console.log(user, 'user');
  delete userList[user.name];
  return userList;
};

const addUser = (users, user) => {
  let userList = Object.assign({}, users);
  userList[user.name] = user;
  return userList;
};

const innactivityTimer = (time, user, cb) => {
  return (user.timer = setTimeout(() => {
    cb(user);
  }, time));
};

const setTimer = (time, user, socket) => {
  innactivityTimer(time, user, () => {
    socket.emit('USER_DISCONNECTED', { user });
  });
};

module.exports = {
  createUser,
  createMessage,
  addUser,
  deleteUser,
  verifyUser,
  setTimer,
};
