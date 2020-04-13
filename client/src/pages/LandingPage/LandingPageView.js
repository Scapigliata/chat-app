import React, { useEffect, useRef } from 'react';
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
  const _isMounted = useRef(true);

  const initializeSocket = () => {
    const socket = io(URL, {
      'force new connection': true,
    });
    socket.on('connect', () => {
      clearMessages();
      console.log('Connection established');
      serverConnected();
    });
    socket.on('disconnect', () => {
      console.log('Server disconnected');
      serverDisconnected();
      window.location.reload(false);
    });
    initSocket(socket);
  };

  const createUser = (user) => {
    socket.emit(USER_CONNECTED, user);
    userConnected(user);
  };

  useEffect(() => {
    initializeSocket();
    return () => {
      _isMounted.current = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!user & _isMounted.current ? (
        <Form socket={socket} createUser={createUser} />
      ) : (
        <Chat />
      )}
      <Message bool={serverState === 'Online' ? true : false}>
        {serverState}
      </Message>
    </div>
  );
};

export default LandingPageView;
