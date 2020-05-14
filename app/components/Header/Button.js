import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  margin: '2px',
  textShadow: '0 0 5px rgba(0,0,0,0.5)',
};

const Button = ({ children, disabled, onClick }) => (
  <IconButton
    color="primary"
    disabled={disabled}
    onClick={onClick}
    style={styles}
  >
    {children}
  </IconButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
