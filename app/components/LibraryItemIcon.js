import PropTypes from 'prop-types';
import React from 'react';

import { FaFolderO, FaFileArchiveO } from 'react-icons/lib/fa';

const LibraryItemIcon = ({ iconSize, isDirectory }) =>
  isDirectory ? (
    <FaFolderO size={iconSize} />
  ) : (
    <FaFileArchiveO size={iconSize} />
  );

LibraryItemIcon.propTypes = {
  iconSize: PropTypes.number.isRequired,
  isDirectory: PropTypes.bool.isRequired,
};

export default LibraryItemIcon;
