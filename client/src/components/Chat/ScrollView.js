import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';

const ScrollView = ({ children }) => (
  <List style={{ maxHeight: '100%', overflow: 'auto' }}>{children}</List>
);

ScrollView.propTypes = {
  children: PropTypes.node,
};

export default ScrollView;
