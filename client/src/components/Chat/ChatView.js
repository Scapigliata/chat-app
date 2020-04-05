import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  MESSAGE_RECIEVED,
  TYPING,
  USER_DISCONNECTED,
} from '../../store/actions/types';
import Messages from '../Messages';
import ChatInput from '../ChatInput';

const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
`;

const Container = styled.div`
  margin: 0;
`;

const Chat = ({
  socket,
  user,
  messages,
  messageRecieved,
  setUserTyping,
  usersTyping,
}) => {
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('USER_CONNECTED', (data) =>
      messageRecieved({
        ...data,
        message: `${data.user} has joined the chat`,
      })
    );
    socket.on(MESSAGE_RECIEVED, (data) => {
      messageRecieved(data);
    });
    socket.on(USER_DISCONNECTED, (data) => {
      const { name, id } = data.user;
      const { message } = data;

      messageRecieved({
        ...data,
        user: name,
        message: message ? message : `${name} has disconnected from the chat`,
      });
      setUserTyping({
        user: { id },
      });
    });

    socket.on(TYPING, (userRes) => {
      if (user.id === userRes.id) {
        return;
      }
      setUserTyping(userRes);
    });
  }, [socket]);

  return (
    <Container>
      <Messages
        socket={socket}
        userName={user}
        messages={messages}
        usersTyping={usersTyping}
      />
      <ChatInputContainer>
        <ChatInput user={user} socket={socket} />
      </ChatInputContainer>
    </Container>
  );
};

export default Chat;
