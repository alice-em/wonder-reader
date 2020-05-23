import PropTypes from 'prop-types';
import React, { memo } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Context from '../../context/ContextFactory';
import CustomDrawer from './Drawer';
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

const Library = ({ classes, style }) => (
  <CustomDrawer style={style}>
    <Context.Consumer>
      {({ openComic, setState, state: { loadedLibrary } }) => (
        <div
          tabIndex={0}
          role="button"
          onKeyDown={() => setState({ isLibraryActive: false })}
        >
          <Layout
            className={classes.list}
            loadedLibrary={loadedLibrary}
            openComic={openComic}
            saveContentDataToParent={content => setState({ content })}
          />
        </div>
      )}
    </Context.Consumer>
  </CustomDrawer>
);

Library.defaultProps = {
  style: {},
};

Library.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  style: PropTypes.objectOf(PropTypes.object.isRequired),
};

export { Library };
export default memo(withStyles(styles)(Library));
