import React from 'react';
import styled from 'styled-components';

const Heading = styled.h4`
  color: ${({ bool }) => (bool ? 'green' : 'red')};
  text-align: center;
  position: fixed;
  top: 0;
  left: ${({ user }) => (user ? '20px' : '')};
  background: ${({ user }) => (user ? 'white' : '')};
`;

const Message = ({ children, bool, user }) => {
  return (
    <Heading user={user} bool={bool}>
      {children}
    </Heading>
  );
};

export default Message;
