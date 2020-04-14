import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { uuid } from 'uuidv4';
import Typing from '../Typing';
import {
  Container,
  MessageContainer,
  Message,
  User,
  Time,
  TypingContainer,
  TypingMessage,
} from './styles';

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
          const currentUser = user === userName.name;
          const admin = user === 'Admin';

          return (
            <MessageContainer
              ref={messagesEndRef}
              key={uuid()}
              admin={admin}
              currentUser={currentUser}
            >
              <User admin={admin} currentUser={currentUser}>
                {user}
              </User>
              <Message admin={admin} currentUser={currentUser}>
                {message}
              </Message>
              <Time admin={admin} currentUser={currentUser}>
                {moment(time).format('h:mm a')}
              </Time>
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
