import React, { useEffect } from 'react';
import ChatInput from '../ChatInput';
import { socketManager } from '../../utils/socket';
import { USER_DISCONNECTED } from '../../store/actions/types';
import {
  ChatInputContainer,
  Container,
  ButtonStyled,
  MessagesStyled,
} from './styles';

const ChatView = ({
  socket,
  user,
  userDisconnected,
  messageRecieved,
  setUserTyping,
  stopUserTyping,
  clearMessages,
  serverError,
}) => {
  const logout = (user) => {
    socket.emit(USER_DISCONNECTED, user);
    socket.disconnect();
    userDisconnected();
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    socketManager(
      socket,
      user,
      messageRecieved,
      setUserTyping,
      stopUserTyping,
      clearMessages,
      serverError,
      userDisconnected
    );
    return () => {
      socket.off();
    };
    // eslint-disable-next-line
  }, [socket, messageRecieved, user]);

  return (
    <Container>
      <ButtonStyled
        title="Logout"
        button
        key="logout"
        onClick={() => logout(user.name)}
      />
      <MessagesStyled socket={socket} userName={user} />
      <ChatInputContainer>
        <ChatInput user={user} socket={socket} />
      </ChatInputContainer>
    </Container>
  );
};

export default ChatView;
