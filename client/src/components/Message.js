import React, { useEffect } from 'react';
import styled from 'styled-components';

const Heading = styled.h4`
  color: ${({ bool }) => (bool ? 'green' : 'red')};
  text-align: center;
  position: fixed;
  top: 0;
  margin-left: 50px;
`;

const Message = ({ children, bool }) => {
  return <Heading bool={bool}>{children}</Heading>;
};

export default Message;
