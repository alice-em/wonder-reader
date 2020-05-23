import PropTypes from 'prop-types';
import React, { memo } from 'react';

import Context from '../../context/ContextFactory';

const styles = {
  width: '100px',
};

const SliderInput = ({ value }) => (
  <Context.Consumer>
    {({ setState }) => (
      <input
        id="SliderInput"
        min="25"
        max="200"
        name="slider"
        onChange={({ target: { value: eventValue } }) => {
          setState({ zoomLevel: Number(eventValue) });
        }}
        type="range"
        value={value}
        style={styles}
      />
    )}
  </Context.Consumer>
);

SliderInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export { SliderInput };
export default memo(SliderInput);
