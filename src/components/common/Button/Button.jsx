import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ children, onClick, type = 'button', width }) => {
  const style = width ? { width } : {};
  return (
    <button className="custom-button" type={type} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  width: PropTypes.string,
};

export default Button;