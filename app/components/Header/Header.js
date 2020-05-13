import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ControlBar from './ControlBar';
import headerStyle from '../headerStyle';

const Header = props => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" style={headerStyle}>
        Wonder Reader
      </Typography>
      <ControlBar {...props} />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  changePageCount: PropTypes.func.isRequired,
  openLibrary: PropTypes.func.isRequired,
  openPrevComic: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  turnPageLeft: PropTypes.func.isRequired,
  turnPageRight: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

export default Header;
