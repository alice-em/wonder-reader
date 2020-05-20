import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import electron from 'electron';
import { FaFolderOpen, FaLevelUpAlt, FaTimes } from 'react-icons/fa';

import Header from './Header';
import Table from './Table';

const { copyDeepObject } = require('../../modules/copyData.js');
const { generateNestedContentFromFilepath } = require('../../modules/generate.js');

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

class Layout extends Component {
  state = {
    contents: [],
    dirname: '',
    fullpath: null,
    id: 'libraryRoot',
    isDirectory: true,
    root: this.props.loadedLibrary,
  };

  /* istanbul ignore next */
  componentDidMount() {
    const { root } = this.state;
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
      this.updateContent(filepath);
    }
  };

  render() {
    const { contents, fullpath } = this.state;

    return (
      <div className="library" style={styles.libraryStyles}>
        <Header
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
        </Header>
        {fullpath && (
          // Library expects only a few props
          <Table contents={contents} onContentClick={this.onClick} />
        )}
      </div>
    );
  }
}

Layout.defaultProps = {
  loadedLibrary: null,
};

Layout.propTypes = {
  closeLibrary: PropTypes.func.isRequired,
  openComic: PropTypes.func.isRequired,
  loadedLibrary: PropTypes.string,
  saveContentDataToParent: PropTypes.func.isRequired,
};

export default Layout;
