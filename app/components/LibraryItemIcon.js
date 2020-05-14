import PropTypes from 'prop-types';
import React from 'react';

import { FaRegFolderOpen, FaRegFileArchive } from 'react-icons/fa';

const LibraryItemIcon = ({ iconSize, isDirectory }) =>
  isDirectory ? (
    <FaRegFolderOpen size={iconSize} />
  ) : (
    <FaRegFileArchive size={iconSize} />
  );

LibraryItemIcon.propTypes = {
  iconSize: PropTypes.number.isRequired,
  isDirectory: PropTypes.bool.isRequired,
};

export default LibraryItemIcon;
