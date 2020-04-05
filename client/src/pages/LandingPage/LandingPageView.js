import React, { useEffect } from 'react';
import io from 'socket.io-client';

import Form from '../../components/Form';
import Drawer from '../../components/Drawer';
import Chat from '../../components/Chat';
import { USER_CONNECTED, USER_DISCONNECTED } from '../../store/actions/types';

const URL = process.env.REACT_APP_URL;

const LandingPageView = ({
  initSocket,
  socket,
  user,
  userConnected,
  clearMessages,
}) => {
  const initializeSocket = () => {
    const socket = io(URL);
    socket.on('connect', () => {
      console.log('Connection established');
    });
    initSocket(socket);
  };

  const createUser = (user) => {
    socket.emit(USER_CONNECTED, user);
    userConnected(user);
  };

  const logout = (user) => {
    socket.emit(USER_DISCONNECTED, user);
    userConnected(null);
    clearMessages();
  };

  useEffect(() => {
    initializeSocket();
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
    </div>
  );
};

export default LandingPageView;
