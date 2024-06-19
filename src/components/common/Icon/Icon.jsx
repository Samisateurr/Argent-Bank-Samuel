import React from 'react';
import PropTypes from 'prop-types';
import './Icon.scss';

function Icon({ name }) {
  return <i className={`fa fa-${name}`} aria-hidden="true"></i>;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;