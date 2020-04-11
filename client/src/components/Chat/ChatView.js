import React, { useEffect } from 'react';
import styled from 'styled-components';
import Messages from '../Messages';
import ChatInput from '../ChatInput';
import { socketManager } from '../../utils/socket';

const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
`;

const Container = styled.div`
  margin: 0;
`;

const ChatView = ({
  socket,
  user,
  messageRecieved,
  setUserTyping,
  stopUserTyping,
  clearMessages,
}) => {
  useEffect(() => {
    if (!socket) {
      return;
    }

    socketManager(
      socket,
      user,
      messageRecieved,
      setUserTyping,
      stopUserTyping,
      clearMessages
    );
  }, [socket, user, setUserTyping, user.id, messageRecieved]);

  return (
    <Container>
      <Messages socket={socket} userName={user} />
      <ChatInputContainer>
        <ChatInput user={user} socket={socket} />
      </ChatInputContainer>
    </Container>
  );
};

export default ChatView;
