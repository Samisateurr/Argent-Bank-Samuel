import React from 'react';
import PropTypes from 'prop-types';
import './Banner.scss';

function Banner({ title = 'Promoted Content', subtitles = [], text }) {
  return (
    <div className="hero">
      <section className="hero-content">
        {title && <h2 className="sr-only">{title}</h2>}
        {subtitles.map((subtitle, index) => (
          <p key={index} className="subtitle">{subtitle}</p>
        ))}
        <p className="text">{text}</p>
      </section>
    </div>
  );
}

Banner.propTypes = {
  title: PropTypes.string,
  subtitles: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string.isRequired,
};

export default Banner;