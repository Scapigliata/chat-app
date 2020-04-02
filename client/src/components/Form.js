import React, { useState } from 'react';
import { USER_VERIFY } from '../store/actions/types';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const Button = styled.button`
  border: none;
`;

const Form = ({ socket, createUser }) => {
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState(false);

  const verifyUserName = ({ user, userNameTaken }) => {
    if (userNameTaken) {
      setError(true);
    } else {
      createUser(user);
      setError(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit(USER_VERIFY, nickName, verifyUserName);
  };

  const handleOnChange = e => {
    setNickName(e.target.value);
  };

  return (
    <div>
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          error={error ? true : false}
          value={nickName}
          onChange={handleOnChange}
          type="text"
          name="name"
          helperText={error ? 'Username taken' : ''}
        />
        <Button type="submit">Join</Button>
      </form>
    </div>
  );
};

export default Form;
