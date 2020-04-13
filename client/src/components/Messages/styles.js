import styled from 'styled-components';

export const Container = styled.div`
  width: 90vw;
  height: 90vh;
  margin: 20px;
`;

export const MessageContainer = styled.div`
  text-align: ${({ currentUser, admin }) =>
    admin ? 'center' : currentUser ? 'right' : 'left'};
  margin-bottom: 60px;
  margin-left: ${({ currentUser }) => (currentUser ? '200px' : '0')};
`;

export const Message = styled.p``;

export const User = styled.h4`
  color: ${({ currentUser, admin }) =>
    admin ? 'green' : currentUser ? 'blue' : 'red'};
`;

export const Time = styled.p`
  font-size: 10px;
`;

export const TypingContainer = styled.div``;

export const TypingMessage = styled.i`
  text-align: center;
  font-size: 10px;
  color: gray;
`;
