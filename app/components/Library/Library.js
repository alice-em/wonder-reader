import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Context from '../../context/ContextFactory';
import Layout from './Layout';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  PaperProps: {
    borderRadius: '0px 0px 0px 15px',
    margin: 'auto',
    // maxWidth: '960px',
  },
};

const Library = ({
  classes,
  closeDrawer,
  openComic,
  saveContentDataToMain,
  style,
}) => (
  <Context.Consumer>
    {({ state }) => (
      <div className="Library" style={style}>
        <Drawer
          anchor="top"
          open={state.top}
          onClose={closeDrawer}
          PaperProps={{ style: styles.PaperProps }}
          variant="temporary"
          transitionDuration={125}
        >
          <div tabIndex={0} role="button" onKeyDown={closeDrawer}>
            <Layout
              className={classes.list}
              closeLibrary={closeDrawer}
              loadedLibrary={state.loadedLibrary}
              openComic={openComic}
              saveContentDataToParent={saveContentDataToMain}
            />
          </div>
        </Drawer>
      </div>
    )}
  </Context.Consumer>
);

Library.defaultProps = {
  style: {},
};

Library.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  closeDrawer: PropTypes.func.isRequired,
  openComic: PropTypes.func.isRequired,
  saveContentDataToMain: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.object.isRequired),
};

export { Library };
export default withStyles(styles)(Library);
