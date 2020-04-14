import styled from 'styled-components';
import Button from '../Button';
import Messages from '../Messages';

export const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
`;

export const Container = styled.div`
  margin: 0;
`;

export const ButtonStyled = styled(Button)`
  position: fixed;
  top: 0;
  right: 0;
  background: red;
  padding: 10px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  border: none;
`;

export const MessagesStyled = styled(Messages)`
  margin-bottom: 200px;
`;
