import React from 'react';
import Proptypes from 'prop-types';

const Button = ({ title, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {title}
  </button>
);

Button.propTypes = {
  className: Proptypes.string,
  title: Proptypes.string.isRequired,
  onClick: Proptypes.func.isRequired,
};

export default Button;
