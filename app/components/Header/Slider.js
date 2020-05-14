import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import SliderInput from '../SliderInput';

const boxShadow = [
  'inset rgb(135, 169, 214) 0px 3px 0px',
  'inset rgba(0, 0, 0, 0.15) 0px 10px 10px',
].join(', ');

const styles = {
  Slider: {
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '5px',
    borderTop: '2px solid rgba(255,255,255,0.8)',
    boxShadow,
    display: 'flex',
    float: 'left',
    marginTop: '7px',
    padding: '3px',
  },
  wide: {
    width: '100px',
  },
  zoomLevel: {
    cursor: 'default',
    fontFamily: 'Carter One',
    fontSize: '20px',
    marginRight: '5px',
    textAlign: 'right',
    width: '45px',
  },
};

const sliderComponent = document.getElementById('sliderComponent');
const blurSliderInput = () => {
  document.getElementById('SliderInput').blur();
};

const Slider = ({ onChange, value }) => {
  useEffect(() => {
    if (sliderComponent) {
      sliderComponent.addEventListener('mouseleave', blurSliderInput);
    }

    return () => {
      if (sliderComponent) {
        sliderComponent.removeEventListener('mouseleave', blurSliderInput);
      }
    };
  });

  const onValueChange = ({ target: { value: eventValue } }) => {
    onChange(eventValue);
  };

  return (
    <div className="slider" id="sliderComponent" style={styles.Slider}>
      <SliderInput onChange={onValueChange} value={value} />
      <div className="zoomLevel" style={styles.zoomLevel}>
        {value}
      </div>
    </div>
  );
};

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Slider;
