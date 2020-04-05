import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { uuid } from 'uuidv4';
import Typing from './Typing';

const Container = styled.div`
  width: 90vw;
  margin: 20px;
`;

const MessageContainer = styled.div`
  text-align: ${({ currentUser }) => (currentUser ? 'right' : 'left')};
  margin-bottom: 100px;
  margin-left: ${({ currentUser }) => (currentUser ? '200px' : '0')};
`;

const Message = styled.p``;

const User = styled.h4`
  color: ${({ currentUser }) => (currentUser ? 'blue' : 'red')};
`;

const Time = styled.p`
  font-size: 10px;
`;

const TypingMessage = styled.i`
  font-size: 10px;
  color: gray;
`;

const Messages = ({ userName, messages, usersTyping }) => (
  <Container>
    {messages &&
      messages.map(({ id, time, user, message }) => {
        return (
          <MessageContainer key={uuid()} currentUser={user === userName.name}>
            <User currentUser={user === userName.name}>{user}</User>
            <Message>{message}</Message>
            <Time>{moment(time).fromNow()}</Time>
          </MessageContainer>
        );
      })}
    {Object.values(usersTyping).map(
      (o) =>
        o && (
          <div key={o}>
            <TypingMessage>{o} is typing...</TypingMessage>
            <Typing type="bubbles" color="blue" height={100} width={50} />
          </div>
        )
    )}
  </Container>
);

export default Messages;
