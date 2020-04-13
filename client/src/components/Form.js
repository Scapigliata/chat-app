import React, { useState } from 'react';
import { USER_VERIFY } from '../store/actions/types';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const Container = styled.div`
  text-align: center;
  background: white;
  border: 5px solid black;
  border-radius: 5px;
  padding: 100px 50px;
  width: 250px;
  height: 200px;
`;
const Heading = styled.h1`
  margin: 0 20px 50px 0;
`;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit(USER_VERIFY, nickName, verifyUserName);
  };

  const handleOnChange = (e) => {
    setNickName(e.target.value);
  };

  return (
    <Container>
      <Heading>Welcome</Heading>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          autoComplete="false"
          error={error ? true : false}
          value={nickName}
          onChange={handleOnChange}
          type="text"
          name="name"
          helperText={error ? 'Username taken' : ''}
        />
        <Button disabled={nickName.length < 1} type="submit">
          <span aria-label="emoji" role="img">
            ✔
          </span>
        </Button>
      </form>
    </Container>
  );
};

export default Form;
