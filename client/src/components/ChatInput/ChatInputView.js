import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import { MESSAGE_SENT } from '../../store/actions/types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
`;

const Form = styled.form`
  display: flex;
`;

const Button = styled.button`
  background: ${({ disabled }) => (disabled ? 'darkseagreen' : 'green')};
  color: ${({ disabled }) => (disabled ? '' : 'white')};
  border: none;
  width: 100px;
`;

const ChatInputView = ({ socket, user }) => {
  const [message, setMessage] = useState('');
  const [alertTyping, toggleAlertTyping] = useState(false);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (message && message.length > 0 && !alertTyping) {
      socket.emit('TYPING', user);
      toggleAlertTyping(true);
    }

    if ((!message || message.length === 0) && alertTyping) {
      socket.emit('TYPING', user);
      toggleAlertTyping(false);
    }
  }, [message]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    socket.emit(MESSAGE_SENT, { user, message });
    setMessage('');
  };

  return (
    <Container>
      <Form onSubmit={handleOnSubmit}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">
            {user.name}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={message}
            onChange={handleOnChange}
            autoComplete={'off'}
            startAdornment={
              <InputAdornment position="start">
                <span aria-label="emoji" role="img">
                  ☺️
                </span>
              </InputAdornment>
            }
            labelWidth={60}
          />
        </FormControl>
        <Button disabled={message.length < 1} type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default ChatInputView;
