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
  delete userList[user.name];
  return userList;
};

const addUser = (users, user) => {
  let userList = Object.assign({}, users);
  userList[user.name] = user;
  return userList;
};

const innactivityTimer = (time, user, socket, cb) => {
  return (socket.user.timer = setTimeout(() => {
    cb(user);
  }, time));
};

module.exports = {
  createUser,
  createMessage,
  addUser,
  deleteUser,
  verifyUser,
  innactivityTimer,
};
