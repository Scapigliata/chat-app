import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Typing from './Typing';

const MessageContainer = styled.div`
  width: 100vw;
  text-align: ${({ currentUser }) => (currentUser ? 'right' : 'left')};
`;

const Message = styled.p``;

const User = styled.h4`
  color: ${({ currentUser }) => (currentUser ? 'blue' : 'red')};
`;

const Time = styled.p`
  font-size: 10px;
`;

const Messages = ({ userName, typing, messages, usersTyping }) => {
  return (
    <MessageContainer>
      {messages &&
        messages.map(({ time, message, user }) => (
          <MessageContainer key={time} currentUser={user === userName.name}>
            <User currentUser={user === userName.name}>{user}</User>
            <Message key={message}>{message}</Message>
            <Time>{moment(time).fromNow()}</Time>
          </MessageContainer>
        ))}
      {Object.values(usersTyping).map(o => (
        <Typing type="bubbles" color="blue" height={100} width={50} />
      ))}
      {typing && <Typing type="bubbles" color="blue" height={100} width={50} />}
    </MessageContainer>
  );
};

export default Messages;
