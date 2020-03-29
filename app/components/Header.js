import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ButtonBar from './ButtonBar';
import headerStyle from './headerStyle';

const Header = ({
  buttons,
  changePageCount,
  pageCount,
  setZoomLevel,
  zoomLevel,
}) => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" style={headerStyle}>
        Wonder Reader
      </Typography>
      <ButtonBar
        buttons={buttons}
        changePageCount={changePageCount}
        pageCount={pageCount}
        setZoomLevel={setZoomLevel}
        zoomLevel={zoomLevel}
      />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  changePageCount: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

export default Header;
