import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { uuid } from 'uuidv4';
import Typing from '../Typing';

const Container = styled.div`
  width: 90vw;
  height: 90vh;
  margin: 20px;
`;

const MessageContainer = styled.div`
  text-align: ${({ currentUser, admin }) =>
    admin ? 'center' : currentUser ? 'right' : 'left'};
  margin-bottom: 60px;
  margin-left: ${({ currentUser }) => (currentUser ? '200px' : '0')};
`;

const Message = styled.p``;

const User = styled.h4`
  color: ${({ currentUser, admin }) =>
    admin ? 'green' : currentUser ? 'blue' : 'red'};
`;

const Time = styled.p`
  font-size: 10px;
`;

const TypingContainer = styled.div``;

const TypingMessage = styled.i`
  text-align: center;
  font-size: 10px;
  color: gray;
`;

const Messages = ({ userName, messages, usersTyping }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, usersTyping]);

  return (
    <Container>
      {messages &&
        messages.map(({ _, time, user, message }) => {
          return (
            <MessageContainer
              ref={messagesEndRef}
              key={uuid()}
              admin={user === 'Admin'}
              currentUser={user === userName.name}
            >
              <User
                admin={user === 'Admin'}
                currentUser={user === userName.name}
              >
                {user}
              </User>
              <Message>{message}</Message>
              <Time>{moment(time).format('h:mm a')}</Time>
            </MessageContainer>
          );
        })}
      {Object.values(usersTyping).map(
        (currentTypingUser) =>
          currentTypingUser && (
            <TypingContainer key={currentTypingUser}>
              <TypingMessage>{currentTypingUser} is typing...</TypingMessage>
              <Typing type="bubbles" color="red" height={100} width={50} />
            </TypingContainer>
          )
      )}
    </Container>
  );
};

export default Messages;
