import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import styled from 'styled-components';

const UserContainer = styled.div`
  flex-direction: column;
  justify-content: center !important;
`;

const ListItemStyled = styled(ListItem)`
  flex-direction: column;
`;

const Options = ({ anchor, toggleDrawer, logout, chats, user, activeChat }) => {
  return (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Chat', 'Friends', 'Active Chat', 'History'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <UserContainer>
        <List>
          <ListItemStyled button key="user">
            <ListItemAvatar>
              <Avatar
                alt=""
                src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
              />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItemStyled>
          <ListItem button key="logout" onClick={() => logout(user.name)}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </UserContainer>
    </div>
  );
};

export default Options;
