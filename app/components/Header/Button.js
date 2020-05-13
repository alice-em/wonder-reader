import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

const generateStyle = (rotation = 0) => ({
  margin: '2px',
  textShadow: '0 0 5px rgba(0,0,0,0.5)',
  transform: `rotate(${rotation}deg)`,
});

const Button = ({ children, disabled, onClick, rotation }) => (
  <IconButton
    color="primary"
    disabled={disabled}
    onClick={onClick}
    style={generateStyle(rotation)}
  >
    {children}
  </IconButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  rotation: PropTypes.number,
};

Button.defaultProps = {
  disabled: false,
  rotation: 0,
};

export default Button;
