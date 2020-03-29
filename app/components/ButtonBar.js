import IconButton from '@material-ui/core/IconButton';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaBook,
  FaMinusSquareO,
  FaSquareO,
} from 'react-icons/lib/fa';

import Slider from './Slider';
import { buttonStyle, buttonTheme } from './buttonStyle';

const initButtons = [
  {
    name: 'openLibrary',
    icon: <FaBook />,
    rotation: 0,
    key: '000',
  },
  {
    name: 'changePageCount',
    icon: <FaMinusSquareO />,
    rotation: 90,
    key: '001',
  },
  {
    name: 'prevComic',
    icon: <FaAngleDoubleLeft />,
    rotation: 0,
    key: '002',
  },
  {
    name: 'pageLeft',
    icon: <FaAngleLeft />,
    rotation: 0,
    key: '003',
  },
  {
    name: 'pageRight',
    icon: <FaAngleRight />,
    rotation: 0,
    key: '004',
  },
  {
    name: 'nextComic',
    icon: <FaAngleDoubleRight />,
    rotation: 0,
    key: '005',
  },
];

const determineIcon = ({ pageCount }) =>
  pageCount === 2 ? <FaMinusSquareO /> : <FaSquareO />;
const determineIfChangePageCount = (icon, button) =>
  button.name === 'changePageCount' ? icon : button.icon;
const determineButtonStyle = (button) => {
  const rotation = typeof button.rotation === 'undefined' ? 0 : button.rotation;
  return {
    margin: '2px',
    textShadow: '0 0 5px rgba(0,0,0,0.5)',
    transform: `rotate(${rotation}deg)`,
  };
};
const determineButtonFunction = button =>
  button.func ? button.func : () => {};

const ButtonBar = (props) => {
  const { buttons, pageCount, setZoomLevel, zoomLevel } = props;

  const renderButton = (button) => {
    const buttonFunction = determineButtonFunction(buttons[button.name]);
    const icon = determineIfChangePageCount(determineIcon(pageCount), button);
    const style = determineButtonStyle(button);

    if (button.color) {
      style.background = '#ef5350';
    }
    return (
      <IconButton
        key={button.key}
        color="primary"
        disabled={buttons[button.name].disabled}
        onClick={buttonFunction}
        style={style}
      >
        {icon}
      </IconButton>
    );
  };

  return (
    <MuiThemeProvider theme={buttonTheme}>
      <div style={buttonStyle}>
        <Slider onChange={setZoomLevel} value={zoomLevel} />
        {initButtons.map(renderButton)}
      </div>
    </MuiThemeProvider>
  );
};

ButtonBar.propTypes = {
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

export default ButtonBar;
