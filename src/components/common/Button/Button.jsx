import React from 'react';
import PropTypes from 'prop-types';
import '../Button/Button.scss';

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button className="custom-button" type={type} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;