import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { FaPercent } from 'react-icons/lib/fa';

import LibraryItemIcon from './LibraryItemIcon';
// import Bookmark from './Bookmark.js';

const styles = {
  bbb: {
    color: '#bbb',
  },
  percent: {
    color: '#999',
    fontSize: '14px',
  },
  TableRow: {
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    fontSize: '20px',
  },
  three33: {
    color: '#333',
  },
  wide: {
    width: '10px',
  },
};

const LibraryItem = ({ basename, dirname, id, isDirectory, onRowClick }) => (
  <TableRow
    className="library-item"
    key={id}
    onClick={onRowClick}
    style={styles.TableRow}
  >
    <TableCell numeric padding="checkbox" style={styles.wide}>
      <LibraryItemIcon iconSize={30} isDirectory={isDirectory} />
    </TableCell>
    <TableCell style={styles.three33}>{basename}</TableCell>
    <TableCell numeric style={styles.bbb}>
      {dirname}
    </TableCell>
    <TableCell padding="checkbox" style={styles.wide}>
      <FaPercent style={styles.percent} />
    </TableCell>
  </TableRow>
);

LibraryItem.propTypes = {
  basename: PropTypes.string.isRequired,
  dirname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDirectory: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default LibraryItem;
