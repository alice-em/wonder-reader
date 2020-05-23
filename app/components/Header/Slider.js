import React, { Fragment, memo, useEffect } from 'react';

import Context from '../../context/ContextFactory';
import SliderInput from './SliderInput';

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

const Slider = () => {
  useEffect(() => {
    if (sliderComponent) {
      sliderComponent.addEventListener('mouseleave', blurSliderInput);
    }

    return () => {
      if (sliderComponent) {
        sliderComponent.removeEventListener('mouseleave', blurSliderInput);
      }
    };
  }, []);

  return (
    <div className="slider" id="sliderComponent" style={styles.Slider}>
      <Context.Consumer>
        {({ state: { zoomLevel } }) => (
          <Fragment>
            <SliderInput value={zoomLevel} />
            <div className="zoomLevel" style={styles.zoomLevel}>
              {zoomLevel}
            </div>
          </Fragment>
        )}
      </Context.Consumer>
    </div>
  );
};

export { Slider };
export default memo(Slider);
