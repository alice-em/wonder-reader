import PropTypes from 'prop-types';
import React from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaBook,
  FaPause,
  FaStop,
} from 'react-icons/fa';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import Button from './Button';
import Slider from './Slider';
import { buttonStyle, buttonTheme } from '../buttonStyle';

const ControlBar = ({
  changePageCount,
  openLibrary,
  openPrevComic,
  pageCount,
  setZoomLevel,
  turnPageLeft,
  turnPageRight,
  zoomLevel,
}) => (
  <MuiThemeProvider theme={buttonTheme}>
    <div style={buttonStyle}>
      <Slider onChange={setZoomLevel} value={zoomLevel} />
      <Button onClick={openLibrary}>
        <FaBook />
      </Button>
      <Button onClick={changePageCount}>
        {pageCount === 2 ? <FaPause /> : <FaStop />}
      </Button>
      <Button onClick={openPrevComic}>
        <FaAngleDoubleLeft />
      </Button>
      <Button onClick={turnPageLeft}>
        <FaAngleLeft />
      </Button>
      <Button onClick={turnPageRight}>
        <FaAngleRight />
      </Button>
      <Button onClick={openPrevComic}>
        <FaAngleDoubleRight />
      </Button>
    </div>
  </MuiThemeProvider>
);

ControlBar.propTypes = {
  changePageCount: PropTypes.func.isRequired,
  openLibrary: PropTypes.func.isRequired,
  openPrevComic: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  turnPageLeft: PropTypes.func.isRequired,
  turnPageRight: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

export default ControlBar;
