import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import { MESSAGE_SENT, TYPING } from '../../store/actions/types';
import { Button, Container, Form } from './styles';

const ChatInputView = ({ socket, user }) => {
  const [message, setMessage] = useState('');
  const [alertTyping, toggleAlertTyping] = useState(false);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (message && message.length > 0 && !alertTyping) {
      socket.emit(TYPING, user);
      toggleAlertTyping(true);
    }

    if ((!message || message.length === 0) && alertTyping) {
      socket.emit(TYPING, user);
      toggleAlertTyping(false);
    }

    return () => {};
  }, [message, alertTyping, socket, user]);

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
            autoFocus
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
