import styled from 'styled-components';

export const Container = styled.div`
  width: 90vw;
  margin: 20px;
  height: 60vh;
  margin-bottom: 150px;
  div:last-child {
    padding-bottom: 100px;
  }
`;

export const MessageContainer = styled.div`
  text-align: ${({ currentUser, admin }) =>
    admin ? 'center' : currentUser ? 'right' : 'left'};
  @media (max-width: 600px) {
    margin-bottom: 30px;
  }
  margin-left: ${({ currentUser }) => (currentUser ? '200px' : '0')};
`;

export const Message = styled.p`
  display: inline-block;
  background: ${({ currentUser, admin }) =>
    admin ? 'green' : currentUser ? 'blue' : 'red'};
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
`;

export const User = styled.h4`
  color: ${({ currentUser, admin }) =>
    admin ? 'green' : currentUser ? 'blue' : 'red'};
  margin: 0;
`;

export const Time = styled.p`
  font-size: 10px;
`;

export const TypingContainer = styled.div`
  margin: 0;
`;

export const TypingMessage = styled.i`
  text-align: center;
  font-size: 10px;
  color: gray;
  margin: 0;
`;
