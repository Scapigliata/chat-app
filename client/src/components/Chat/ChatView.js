import React, { useEffect } from 'react';
import styled from 'styled-components';
import Messages from '../Messages';
import ChatInput from '../ChatInput';
import { socketManager } from '../../utils/socket';
import { USER_DISCONNECTED } from '../../store/actions/types';
import Button from '../Button';

const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
`;

const Container = styled.div`
  margin: 0;
`;

const ButtonStyled = styled(Button)`
  position: fixed;
  top: 0;
  right: 0;
  background: red;
  padding: 10px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  border: none;
`;

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
  }, [socket, messageRecieved]);

  return (
    <Container>
      <ButtonStyled
        title="Logout"
        button
        key="logout"
        onClick={() => logout(user.name)}
      />
      <Messages socket={socket} userName={user} />
      <ChatInputContainer>
        <ChatInput user={user} socket={socket} />
      </ChatInputContainer>
    </Container>
  );
};

export default ChatView;
