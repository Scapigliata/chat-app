import React, { Fragment, useState } from 'react';
import { Button, SwipeableDrawer } from '@material-ui/core';
import Menu from './Menu';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background: mediumaquamarine;
`;

const Drawer = ({ logout, chats, user, activeChat }) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Container>
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Menu
              logout={logout}
              chats={chats}
              user={user}
              activeChat={activeChat}
              anchor={anchor}
              toggleDrawer={toggleDrawer}
            />
          </SwipeableDrawer>
        </Fragment>
      ))}
    </Container>
  );
};

export default Drawer;
