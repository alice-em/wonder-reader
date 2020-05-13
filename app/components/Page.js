import PropTypes from 'prop-types';
import React from 'react';

const Page = ({ alt, id, src, width }) => (
  <img
    id={id}
    key={id}
    className="image"
    draggable="false"
    alt={alt}
    src={`file:///${src}`}
    style={{ width: `${width}%` }}
  />
);

Page.propTypes = {
  alt: PropTypes.string.isRequired,
  id: PropTypes.string, // eslint-disable-line
  src: PropTypes.string, // eslint-disable-line
  width: PropTypes.number.isRequired,
};

export default Page;
