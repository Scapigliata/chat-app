import React, { useEffect } from 'react';
import io from 'socket.io-client';

import Form from '../../components/Form';
import Drawer from '../../components/Drawer';
import Chat from '../../components/Chat';
import { USER_CONNECTED, USER_DISCONNECTED } from '../../store/actions/types';
import Message from '../../components/Message';

const URL = process.env.REACT_APP_URL;

const LandingPageView = ({
  initSocket,
  socket,
  user,
  userConnected,
  userDisconnected,
  clearMessages,
  serverConnected,
  serverDisconnected,
  serverState,
}) => {
  const initializeSocket = () => {
    const socket = io(URL);
    socket.on('connect', () => {
      console.log('Connection established');
      serverConnected();
    });
    socket.on('disconnect', () => {
      console.log('Server disconnected');
      serverDisconnected();
    });
    initSocket(socket);
  };

  const createUser = (user) => {
    socket.emit(USER_CONNECTED, user);
    userConnected(user);
  };

  const logout = (user) => {
    socket.emit(USER_DISCONNECTED, user);
    userDisconnected();
    clearMessages();
  };

  useEffect(() => {
    initializeSocket();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!user ? (
        <Form socket={socket} createUser={createUser} />
      ) : (
        <>
          <Drawer logout={logout} user={user} />
          <Chat />
        </>
      )}
      <Message bool={serverState === 'Connected' ? true : false}>
        {serverState}
      </Message>
    </div>
  );
};

export default LandingPageView;
