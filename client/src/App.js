import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import LandingPage from './pages/LandingPage';

const Container = styled.div`
  display: flex;
  background-size: cover;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  min-width: 100vw;
`;

const App = () => {
  return (
    <Container className="App">
      <Router>
        <Switch>
          <Route path={['/', '/chat']} component={LandingPage} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
