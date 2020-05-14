import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import electron from 'electron';
import { FaFolderOpen, FaLevelUpAlt, FaTimes } from 'react-icons/fa';

import LibraryHeader from './LibraryHeader';
import LibraryTable from './LibraryTable';

const { copyDeepObject } = require('../modules/copyData.js');
const { generateNestedContentFromFilepath } = require('../modules/generate.js');

const { dialog } = electron.remote ? electron.remote : electron;

const styles = {
  closeButton: {
    background: '#ef5350',
  },
  libraryStyles: {
    marginTop: '64px',
    maxHeight: 'calc(90vh - 64px)',
    overflowY: 'auto',
  },
};

class LibraryLayout extends Component {
  state = {
    contents: [],
    dirname: '',
    fullpath: null,
    id: 'libraryRoot',
    isDirectory: true,
    root: '',
  };

  /* istanbul ignore next */
  componentDidMount() {
    const { root } = this.props;
    if (root) {
      this.updateContent(root);
    }
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    this.props.saveContentDataToParent(this.state);
  }

  onClick = ({ fullpath, isDirectory }) => {
    if (isDirectory) {
      this.updateContent(fullpath);
    } else {
      this.props.openComic(fullpath);
    }
  };

  // Function to open `Load` window, and pass path to generateContent, then setstate
  openDirectory = () => {
    const properties = ['openDirectory'];
    dialog.showOpenDialog({ properties }, this.updateRoot);
  };

  setContentToState = (content) => {
    const newContent = copyDeepObject(content);
    newContent.id = 'libraryRoot';
    this.setState(newContent);
  };

  setParentAsLibrary = () => {
    const { dirname } = this.state;
    this.updateContent(dirname);
  };

  updateContent = (filepath) => {
    generateNestedContentFromFilepath(filepath, this.setContentToState);
  };

  updateRoot = ([filepath]) => {
    if (filepath) {
      const { updateRoot } = this.props;
      updateRoot(filepath);
      this.updateContent(filepath);
    }
  };

  render() {
    const { contents, fullpath } = this.state;

    return (
      <div className="library" style={styles.libraryStyles}>
        <LibraryHeader
          position="fixed"
          title="Library"
          onContentClick={this.onClick}
        >
          <div>
            <IconButton onClick={this.openDirectory} color="primary">
              <FaFolderOpen />
            </IconButton>
            <IconButton onClick={this.setParentAsLibrary} color="primary">
              <FaLevelUpAlt />
            </IconButton>
            <IconButton
              onClick={this.props.closeLibrary}
              color="primary"
              style={styles.closeButton}
            >
              <FaTimes />
            </IconButton>
          </div>
        </LibraryHeader>
        {fullpath && (
          // Library expects only a few props
          <LibraryTable contents={contents} onContentClick={this.onClick} />
        )}
      </div>
    );
  }
}

LibraryLayout.defaultProps = {
  root: null,
};

LibraryLayout.propTypes = {
  closeLibrary: PropTypes.func.isRequired,
  openComic: PropTypes.func.isRequired,
  root: PropTypes.string,
  saveContentDataToParent: PropTypes.func.isRequired,
  updateRoot: PropTypes.func.isRequired,
};

export default LibraryLayout;
