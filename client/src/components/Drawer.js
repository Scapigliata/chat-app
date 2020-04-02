import React, { Fragment, useState } from 'react';
import { Button, SwipeableDrawer } from '@material-ui/core';
import Options from './Options';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Drawer = ({ logout, chats, user, activeChat }) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
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
      {['left'].map(anchor => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Options</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Options
              logout={logout}
              chats={chats}
              user={user}
              activeChat={activeChat}
              anchor={anchor}
              toggleDrawer={toggleDrawer}
            />
            }
          </SwipeableDrawer>
        </Fragment>
      ))}
    </Container>
  );
};

export default Drawer;
