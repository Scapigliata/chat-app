import React from 'react';
import ReactLoading from 'react-loading';

const Typing = ({ type, color, height = 667, width = 375 }) => (
  <ReactLoading type={type} color={color} height={height} width={width} />
);

export default Typing;
