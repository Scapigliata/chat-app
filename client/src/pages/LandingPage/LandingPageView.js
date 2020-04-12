import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Form from '../../components/Form';
import Chat from '../../components/Chat';
import { USER_CONNECTED } from '../../store/actions/types';
import Message from '../../components/Message';

const URL = process.env.REACT_APP_URL;

const LandingPageView = ({
  clearMessages,
  initSocket,
  socket,
  user,
  userConnected,
  serverConnected,
  serverDisconnected,
  serverState,
}) => {
  const initializeSocket = () => {
    const socket = io(URL);
    socket.on('connect', () => {
      clearMessages();
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

  useEffect(() => {
    initializeSocket();
    return () => {};
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      {!user ? <Form socket={socket} createUser={createUser} /> : <Chat />}
      <Message bool={serverState === 'Online' ? true : false}>
        {serverState}
      </Message>
    </div>
  );
};

export default LandingPageView;
