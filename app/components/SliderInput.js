import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  width: '100px',
};

const SliderInput = ({ onChange, value }) => (
  <input
    id="SliderInput"
    min="25"
    max="200"
    name="slider"
    onChange={onChange}
    type="range"
    value={value}
    style={styles}
  />
);

SliderInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default SliderInput;
