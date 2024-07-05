import React from 'react';
import PropTypes from 'prop-types'; 
import '../Feature/Feature.scss';

function Feature({ imgSrc, imgAlt, title, description }) {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

Feature.propTypes = {
  imgSrc: PropTypes.string.isRequired, 
  imgAlt: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired,  
  description: PropTypes.string.isRequired 
};

export default Feature;
