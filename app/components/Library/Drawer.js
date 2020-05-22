import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import React from 'react';

import Context from '../../context/ContextFactory';

const styles = {
  PaperProps: {
    borderRadius: '0px 0px 0px 15px',
    margin: 'auto',
    // maxWidth: '960px',
  },
};

const CustomDrawer = ({ children, style }) => (
  <Context.Consumer>
    {({ setState, state }) => (
      <div className="Library" style={style}>
        <Drawer
          anchor="top"
          open={state.isLibraryActive}
          onClose={() => setState({ isLibraryActive: false })}
          PaperProps={{ style: styles.PaperProps }}
          variant="temporary"
          transitionDuration={125}
        >
          {children}
        </Drawer>
      </div>
    )}
  </Context.Consumer>
);

CustomDrawer.defaultProps = {
  style: {},
};

CustomDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf(PropTypes.object.isRequired),
};

export default CustomDrawer;
