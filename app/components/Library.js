import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import LibraryLayout from './LibraryLayout';

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
    maxWidth: '960px',
  },
};

class Library extends Component {
  state = {
    root: this.props.loadedLibrary,
  };

  updateRoot = (filepath) => {
    this.setState({ root: filepath });
  };

  render() {
    const {
      classes,
      closeDrawer,
      open,
      openComic,
      saveContentDataToMain,
      style,
    } = this.props;
    const { root } = this.state;

    return (
      <div className="Library" style={style}>
        <Drawer
          anchor="top"
          open={open}
          onClose={closeDrawer}
          PaperProps={{ style: styles.PaperProps }}
          variant="temporary"
          transitionDuration={125}
        >
          <div tabIndex={0} role="button" onKeyDown={closeDrawer}>
            <LibraryLayout
              className={classes.list}
              closeLibrary={closeDrawer}
              openComic={openComic}
              root={root}
              saveContentDataToParent={saveContentDataToMain}
              updateRoot={this.updateRoot}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

Library.defaultProps = {
  loadedLibrary: null,
  style: {},
};

Library.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  closeDrawer: PropTypes.func.isRequired,
  loadedLibrary: PropTypes.string,
  open: PropTypes.bool.isRequired,
  openComic: PropTypes.func.isRequired,
  saveContentDataToMain: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.object.isRequired),
};

export { Library };
export default withStyles(styles)(Library);
